export const monthsMapper: any = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const transform = (data: any) => {
  const transformed: any = [["Month", "View", "Cart", "Order"]];
  const categoryPosts = data.reduce((acc: any, record: any) => {
    let { month, eventType, _count }: any = record;
    month = monthsMapper[parseInt(month)];

    return { ...acc, [month]: [...(acc[month] || []), [eventType, _count]] };
  }, {});
  Object.entries(categoryPosts).forEach((month: any) => {
    let view = 0;
    let order = 0;
    let cart = 0;
    month[1].forEach((log: any) => {
      if (log[0] == "View") view = log[1];
      if (log[0] == "Cart") cart = log[1];
      if (log[0] == "Order") order = log[1];
    });
    transformed.push([month[0], view, cart, order]);
  });
  return transformed;
};
