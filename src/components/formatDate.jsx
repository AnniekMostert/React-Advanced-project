export const formatDate = (startTime, endTime) => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const formattedDate = startDate.toLocaleDateString("en-GB");
  const formattedStartTime = startDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = endDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateAndTime = {
    date: formattedDate,
    time: formattedStartTime + " - " + formattedEndTime,
  };

  return dateAndTime;
};
