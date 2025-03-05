
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 px-4">
      <div className="text-center max-w-md animate-fade-in">
        <span className="tag tag-movement mb-4 mx-auto">404</span>
        <h1 className="text-4xl font-serif font-bold mb-4">Page Not Found</h1>
        <p className="text-foreground/70 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 rounded-md bg-primary text-white font-medium hover-card"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
