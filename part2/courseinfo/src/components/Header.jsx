const Header = ({level, title}) => {
    let HeadingTag;
  
    switch (level) {
      case 1:
        HeadingTag = 'h1';
        break;
      case 2:
        HeadingTag = 'h2';
        break;

      // Add more cases if needed for higher heading levels

      default:
        HeadingTag = 'h1'; // Default to h1 if level is not provided or invalid
        break;
    }
  
    return <HeadingTag>{title}</HeadingTag>
  }

export default Header