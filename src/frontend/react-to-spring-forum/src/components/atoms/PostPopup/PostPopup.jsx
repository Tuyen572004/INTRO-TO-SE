import Popup from "reactjs-popup";

const Post = () => {
  return;
};
const PostPopup = ({ component }) => {
  return (
    <Popup
      trigger={<button> Trigger</button>}
      modal
      nested
      position="right center"
    >
      <div>Popup content here !!</div>
    </Popup>
  );
};

export default PostPopup;
