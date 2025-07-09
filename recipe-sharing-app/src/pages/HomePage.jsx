import RecipeList from '../components/RecipeList';

export default function HomePage() {
  return (
    <div>
      {/* Banner đầu trang */}
      <div className="relative rounded overflow-hidden shadow mb-8">
        <img
          src="https://source.unsplash.com/1200x400/?table,food,meal"
          alt="banner"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Recipe Sharing</h1>
          <p className="text-lg">Find and share your favorite recipes.</p>
        </div>
      </div>

      {/* Danh sách món ăn */}
      <div className="px-4">
        <RecipeList />
      </div>
    </div>
  );
}
