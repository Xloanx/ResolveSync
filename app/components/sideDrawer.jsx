'use client'

import React, { useState } from 'react'


const SideDrawer = ({   caller,
                        header,
                        content,
                        position = 'right',
                        width = 800
                    }) => {
  

  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(width);

   // Add this function to pass down to children
   const handleClose = () => {
    setIsOpen(false);
  };

    // Modify the content rendering to pass down the close handler
    const contentWithProps = React.isValidElement(content)
    ? React.cloneElement(content, { onDrawerClose: handleClose })
    : content;

  const handleDragStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    
    const startX = e.pageX;
    const startWidth = sidebarWidth;
    
    const handleDrag = (moveEvent) => {
      if (position === 'right') {
        const diff = startX - moveEvent.pageX;
        setSidebarWidth(Math.max(250, Math.min(800, startWidth + diff)));
      } else {
        const diff = moveEvent.pageX - startX;
        setSidebarWidth(Math.max(250, Math.min(800, startWidth + diff)));
      }
    };
    
    const handleDragEnd = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
    
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const sidebarStyles = {
    width: `${sidebarWidth}px`,
    [position]: isOpen ? 0 : `-${sidebarWidth}px`
  };








const defaultContent = (
    <>
    <p className="text-gray-600 mb-4">
      Cras mattis consectetur purus sit amet fermentum. Cras justo odio, 
      dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta 
      ac consectetur ac, vestibulum at eros.
    </p>
    <p className="text-gray-600 mb-4">
      Scroll down to see more content...
    </p>
    {[...Array(10)].map((_, i) => (
      <div key={i} className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Section {i + 1}</h3>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <img 
          src={`/api/placeholder/${300 + i}/${200 + i}`}
          alt={`Example image ${i + 1}`}
          className="w-full rounded-lg shadow-md my-4"
        />
      </div>
    ))}
  </>
  );






  return (
    <div className="p-4">
      <span 
        className="cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        >
        {caller}
    </span>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          fixed top-0 h-full bg-white shadow-lg z-50
          transition-all duration-300 ease-in-out
        `}
        style={sidebarStyles}
      >
        {/* Resize handle */}
        <div
          className={`absolute top-0 ${position === 'right' ? 'left-0' : 'right-0'} h-full w-1 cursor-ew-resize
            hover:bg-blue-200 transition-colors ${isDragging ? 'bg-blue-400' : ''}`}
          onMouseDown={handleDragStart}
        />

        <div className="h-full flex flex-col">
          {/* Header */}

            <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl font-semibold"> {header} </h2>
                <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                >
                </button>
            </div>


            {/* Scrollable content area */}
            <div className="flex-1 overflow-y-auto p-4">
                {contentWithProps || defaultContent}
            </div>
        </div>
        </div>
        </div>
    );
          
    
};

export default SideDrawer;