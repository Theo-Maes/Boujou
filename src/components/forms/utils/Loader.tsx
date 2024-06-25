import { useSpring, motion } from "framer-motion";
import { useEffect } from "react";
interface LoaderProps {
  totalSteps: number;
  currentStep: number;
  [key: string]: any;
}
interface TileProps {
  isSubimted: boolean;
}
export const Tile = ({ isSubimted }: TileProps) => {
  const scaleX = useSpring(0, { stiffness: 1000, damping: 100 });

  useEffect(() => {
    if (isSubimted) {
      scaleX.set(1);
    } else {
      scaleX.set(0);
    }
  }, [isSubimted, scaleX]);

  return (
    <motion.div
      style={{
        position: "absolute",
        transformOrigin: "left",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        scaleX,
      }}
      className="bg-primary"
    ></motion.div>
  );
};
const Loader = ({ totalSteps = 2, currentStep, ...rest }: LoaderProps) => {
  return (
    <div {...rest}>
      {[...new Array(totalSteps)].map((el, i) => {
        return (
          <div key={i} className="relative flex-1 h-full bg-blue-200">
            <Tile isSubimted={i <= currentStep} />
          </div>
        );
      })}
    </div>
  );
};
export default Loader;
