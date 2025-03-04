import React from "react";

function ZaxiraKitobKatagi({ stock, book }) {
  const kitob = book?.find((item) => {
    return item.id === stock.bookId;
  });
  return <div>{stock.bookId} {kitob?.name}</div>;
}

export default ZaxiraKitobKatagi;
