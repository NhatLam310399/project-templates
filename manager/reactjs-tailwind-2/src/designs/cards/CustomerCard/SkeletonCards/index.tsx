import React from "react";
import CustomerCard from "designs/cards/CustomerCard";

const SkeletonCards: React.FC = props => {
  return (
    <div className="grid w-full grid-cols-1 col-span-3 gap-2 h-60 desktop:pb-9 phone:grid-cols-2 desktop:grid-cols-3 scrollbar-hide">
      {new Array(9).fill({}).map((customer, index) => {
        return <CustomerCard key={String(index)} user={customer} loading />;
      })}
    </div>
  );
};

export default SkeletonCards;
