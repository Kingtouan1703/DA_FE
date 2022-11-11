export default function Home() {
  
  return (
    <div className="w-full p-2">
      <div
        className="p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800 mx-auto flex items-center"
        role="alert">
        <span className="font-medium">Chào mừng gymers!</span> Chào mừng ban đến với KingtouanGyms.
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-900  dark:text-white">Home Page</h2>
        <p className="tracking-tighter text-gray-500 md:text-sm dark:text-gray-400">Gym có địa chỉ tại tầng 2 tòa sme Hoàng gia.</p>
        <p className="tracking-tighter text-gray-500 md:text-sm dark:text-gray-400">Với đội ngũ PT Chuyên nghiệp</p>

        <img
          src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/44996340210303.577600c3d031e.jpg"
          className=" rounded-lg "></img>
      </div>
    </div>
  )
}
