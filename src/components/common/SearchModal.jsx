import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

const SearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus input when modal opens
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Add your search logic here
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Search Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Open search"
      >
        <Search className="size-12" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fade-in"
          >
            <form onSubmit={handleSearch} className="p-4">
              <div className="flex items-center border-b border-gray-300 pb-2">
                <Search className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full outline-none text-gray-800 placeholder-gray-400"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                {/* Search results would go here */}
                {/* <SearchResults query={searchQuery} /> */}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;