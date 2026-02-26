import Header from "./header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}