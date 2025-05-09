import { DesktopMenu } from "./desktop/DesktopMenu";
import { MobileMenu } from "./mobile/MobileMenu";


export const SideInfoMenu = () => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) 
      return (
        <MobileMenu />
      )


    return ( 
      <DesktopMenu />
    )
}