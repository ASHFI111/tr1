{/* <div className="p-6">
  {activeTab === "specifications" && (
    <div className="text-white space-y-3">
      <h3 className="text-xl font-semibold mb-4 text-red-400">Technical Specifications</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex">
          <span className="text-gray-400 w-40">Brand</span>
          <span className="font-medium">{futureProdDetails.brand}</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-40">Model</span>
          <span className="font-medium">{futureProdDetails.title}</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-40">Generic Name</span>
          <span className="font-medium">{futureProdDetails.category}</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-40">Headphones Type</span>
          <span className="font-medium">{futureProdDetails.type}</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-40">Connectivity</span>
          <span className="font-medium">{futureProdDetails.connectivity}</span>
        </div>
        <div className="flex">
          <span className="text-gray-400 w-40">Microphone</span>
          <span className="font-medium">Yes</span>
        </div>
      </div>
    </div>
  )}

  {activeTab === "overview" && (
    <div className="text-gray-300">
      <h3 className="text-xl font-semibold mb-4 text-red-400">Product Overview</h3>
      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed">
          Experience premium audio quality with the{" "}
          <span className="font-medium text-white">{futureProdDetails.title}</span>. This{" "}
          <span className="font-medium text-white">
            {futureProdDetails.category.toLowerCase()}
          </span>{" "}
          features{" "}
          <span className="font-medium text-white">
            {futureProdDetails.connectivity.toLowerCase()}
          </span>{" "}
          connectivity and{" "}
          <span className="font-medium text-white">
            {futureProdDetails.type.toLowerCase()}
          </span>{" "}
          design for comfortable wear.
        </p>
        <p className="text-lg leading-relaxed mt-4">
          Perfect for{" "}
          {futureProdDetails.category === "Headphones"
            ? "immersive listening experiences with crystal-clear sound reproduction."
            : "on-the-go music lovers who demand both style and substance."}
        </p>
      </div>
    </div>
  )}

  {activeTab === "reviews" && (
    <div className="text-white">
      <h3 className="text-xl font-semibold mb-6 text-red-400">Customer Reviews</h3>
      {reviewsData && reviewsData.length > 0 ? (
        <div className="space-y-6">
          {reviewsData.map((review) => (
            <div
              className="flex p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
              key={review.id}
            >
              <img
                src={review.url}
                alt={review.name}
                className="h-14 w-14 rounded-full mr-4 object-cover border border-gray-700"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-lg">{review.name}</h4>
                  <span className="text-gray-400 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center mb-3">
                  {renderRatingStars(5)}
                  <span className="ml-2 text-sm text-gray-400">
                    Verified Purchase
                  </span>
                </div>
                <p className="text-gray-300">{review.review}</p>
                <div className="mt-3 flex space-x-4">
                  <button className="text-sm text-gray-400 hover:text-white">
                    Helpful
                  </button>
                  <button className="text-sm text-gray-400 hover:text-white">
                    Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">No reviews available yet</p>
          <button className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white">
            Be the first to review
          </button>
        </div>
      )}
    </div>
  )}
</div> */}

              