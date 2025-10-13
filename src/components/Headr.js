// import "./Headr.css";
// function Headr() {
//   return (
//     <div className="headr">
//   🎬 MOVIESFLIX 🎥
//     </div>
//   );
// }

// export default Headr;
import "./Headr.css";

const Headr = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="headr">
      🎬 Entertainment Hub 🎥
    </span>
  );
};

export default Headr;