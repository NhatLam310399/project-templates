interface IRegisterLayoutProps {}

const RegisterLayout: React.FC<IRegisterLayoutProps> = props => {
  const { children } = props;
  return (
    <>
      <div className="register-layout w-full bg-white max-w-5xl px-1.5 mb-8 mx-auto">
        {children}
      </div>
      {/* <footer className="mt-9 w-full text-center text-primary text-md">
        © 2021, KTV APP. Bản quyền thuộc về KTV. Phát triển bởi{" "}
        <strong>USUM SOFTWARE.</strong>
      </footer> */}
    </>
  );
};

export default RegisterLayout;
