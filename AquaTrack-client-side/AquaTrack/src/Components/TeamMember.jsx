"use client";



import React from "react";
const teamMembers = [
  {
    name: "Rayhan Islam",
    id: 202318102,
    dept: "ME-21",
    imageUrl: "https://i.ibb.co/zhD8VphZ/515565246-739248189057227-6926663202621509827-n.jpg",
  },
  {
    name: "Jenia Lima",
    id: 202318066,
    dept: "ME-21",
    imageUrl:
      "https://i.ibb.co/5hfNmb8J/494662902-1235474064765154-310815955672255402-n.jpg",
  },
  {
    name: "Safayet Siam",
    id: 202318093,
    dept: "ME-21",
    imageUrl:
      "https://i.ibb.co/zHCx7d5M/515680381-2335168963544145-4491238740569749893-n.jpg",
  },
  {
    name: "Tamanna Suana",
    id: 202318131,
    dept: "ME-21",
    imageUrl:
      "https://i.ibb.co/hxrY4D00/485727887-599153286502577-1615577477194663827-n.jpg",
  },
  {
    name: "Tanvir Hasib",
    id: 2023181086,
    dept: "ME-21",
    imageUrl:
      "https://i.ibb.co/dsgHpS0C/480689515-1202193821409847-2607261277754225853-n.jpg",
  },
];
const TeamMemberCard = ({ member }) => (
  <div className="flex flex-col items-center text-center">
    <img
      className="w-68 h-68 md:w-60 md:h-60 hover:transform  hover:scale-110 hover:transition-transform duration-200    rounded-2xl object-cover shadow-lg hover:ring-orange-500 ring ring-sky-500 drop-shadow-2xl dark:shadow-sky-500"
      src={member.imageUrl}
    />
    <h3 className="mt-7 text-lg font-semibold text-gray-900 dark:text-white">
      {member.name}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">{member.id}</p>
    <p className="text-sm text-gray-600 dark:text-gray-300">{member.dept}</p>
  </div>
);
const TeamMember = () => {
  return (
    <section className="font-sans">
      <div className=" mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Meet the brains
          </h2>
        </div>

        {}                          
        <div className="grid grid-cols-1 md:grid-cols-5  w-10/12 mx-auto   gap-x-8 gap-y-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamMember;
