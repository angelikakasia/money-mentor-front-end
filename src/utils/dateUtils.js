export const generateMonthOptions = (monthsBack = 12) => {
  const options = [];
  const date = new Date();

  for (let i = 0; i < monthsBack; i++) {
    const value = date.toISOString().slice(0, 7); // "YYYY-MM"
    const label = date.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    options.push({ value, label });
    date.setMonth(date.getMonth() - 1);
  }

  return options;
};
