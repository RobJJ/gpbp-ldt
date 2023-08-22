import Link from "next/link";

export default function ContentFeedback() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 bg-[#E8E8F4] w-full px-10 py-8 rounded">
        <p className="italic">
          If you have any questions regarding the above methodologies, please
          contact leave feedback by following the link below
        </p>
        <div className=" w-full flex justify-center">
          <Link
            href={"https://pim-pam.net/"}
            target="_blank"
            className="bg-[#5467C0] px-4 py-2 text-white font-bold text-sm rounded"
          >
            Feedback Form
          </Link>
        </div>
      </div>
    </>
  );
}
