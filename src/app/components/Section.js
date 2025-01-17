const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg mb-4 font-[500]">{title}</h2>
    <hr />
    {children}
  </div>
);

export default Section;
