import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { MobileMenuContent } from "./MobileMenuContent";
import { useState } from "react";

export const MobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <Button
        icon={<MenuOutlined />}
        onClick={toggleMobileMenu}
        style={{ border: "none" }}
      />
      <Drawer
        title={null}
        placement="right"
        onClose={toggleMobileMenu}
        open={mobileMenuOpen}
        width={250}
      >
        <MobileMenuContent />
      </Drawer>
    </>
  );
};
