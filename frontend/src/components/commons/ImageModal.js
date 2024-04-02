// const ImageModal = ({ imageLink, portfolio, onClose }) => {
//   console.log("portfolio is", portfolio);

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
//       <div className="relative">
//         <img
//           src={imageLink}
//           alt="Selected Image"
//           className="max-w-full max-h-[80vh]"
//         />
//         <button
//           className="absolute top-2 right-2 text-white hover:text-gray-300"
//           onClick={onClose}
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ImageModal;

const ImageModal = ({ imageLink, portfolio, onClose }) => {
  console.log("portfolio:", portfolio);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative p-2 bg-green-100 rounded-md">
        <img
          src={imageLink}
          alt="Selected Image"
          className="max-w-full max-h-[60vh] rounded-lg"
        />

        <div className="mt-4">
          <h2 className="text-xl font-semibold">Website Description:</h2>
          <p className="text-base border border-green-600 rounded-md p-2 mt-2">
            {portfolio?.description}
          </p>
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-semibold">Website Link:</h2>
          <a
            href={`https://${portfolio.websiteLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black-500 hover:text-green-700 underline"
          >
            {portfolio.websiteLink}
          </a>
        </div>
        <button
          className="text-white text-base font-semibold hover:text-gray-300 bg-green-600 px-2 py-1.5 hover:bg-green-500 rounded-md mt-4 w-full"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
