export const formatISOToNormal = (ISOString) => {
    const date = new Date(ISOString);
  
    const formattedDateDMY = date.toLocaleDateString("en-GB").replaceAll('/', '-');
    const formattedDateYMD = date.toLocaleDateString("en-CA").replaceAll('/', '-')
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    return {dateDMY: formattedDateDMY, dateYMD: formattedDateYMD, time: formattedTime};
  };