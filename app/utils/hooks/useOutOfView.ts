import { useEffect, useRef, useState } from "react";

const useOutOfView = (): [boolean, React.RefObject<HTMLDivElement>] => {
  const [isOutOfView, setIsOutOfView] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOutOfView(!entry.isIntersecting);
      },
      {
        root: null, // use the document's viewport as the container
        rootMargin: "0px",
        threshold: 0, // trigger callback when 0% of the target is visible
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  return [isOutOfView, observerRef];
};

export default useOutOfView;
