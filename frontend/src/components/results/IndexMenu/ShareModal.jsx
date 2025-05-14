import { Col, Modal, Row } from "antd";
import { BsFacebook, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ShareOption = styled(Row)`
  font-size: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 4px;
  background-color: rgb(39, 39, 39);
  padding: 12px;
  border-radius: 15px;
  cursor: pointer;
  color: white;

  &:hover {
    background-color: rgb(36, 36, 36);
  }
`;

const ShareOptionsContainer = styled(Col)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;


export const ShareModal = ({ open, setOpen, url }) => {  
    return (
    <Modal
      title="Compartilhar resultado"
      open={open}
      footer={null}
      onCancel={() => setOpen(false)}
      maskClosable={true}
      width={300}
    >
      <ShareOptionsContainer>
        <Link to={`https://api.whatsapp.com/send?text=${url}`} target="_blank">
          <ShareOption>
            <BsWhatsapp /> WhatsApp
          </ShareOption>
        </Link>

        <Link to={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank">
          <ShareOption>
            <BsFacebook /> Facebook
          </ShareOption>
        </Link>

        <Link to={`https://x.com/intent/post?url=${url}`} target="_blank">
          <ShareOption>
            <BsTwitter /> Twitter
          </ShareOption>
        </Link>
      </ShareOptionsContainer>
    </Modal>
  );
};
