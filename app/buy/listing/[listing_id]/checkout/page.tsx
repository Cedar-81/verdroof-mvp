"use client";
import React, { useEffect, useState } from "react";
import { X, ChevronLeft, BedSingle, UsersRound, Info } from "lucide-react";
import Image from "next/image";
import { InspectionDay, ListingForm } from "../../../../utils/interfaces";
import { useSingleListing } from "@/app/utils/hooks/useSingleListing";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

function Reciept() {
  const { listing_id } = useParams<{ listing_id: string }>();
  const { data, isError, error } = useSingleListing(listing_id);
  const [newData, setNewData] = useState<ListingForm>();

  useEffect(() => {
    data && data.data && setNewData(data.data as ListingForm);
  }, [data]);

  isError && toast.error(error.message);

  return (
    <>
      {newData && (
        <div className="md:sticky max-h-min md:top-[8rem] w-full border  border-black/30 rounded-lg p-5 space-y-6">
          <div className="flex min-[4rem] max-h-max space-x-3 overflow-clip">
            <div
              className={
                "min-h-full min-w-[8rem] rounded-lg relative inline-block overflow-hidden m-0"
              }
            >
              <Image
                fill={true}
                alt="building"
                src="/images/checkout.avif"
                className="h-full w-full object-cover absolute"
              />
            </div>

            <div className="space-y-3 py-2">
              <div className="space-y-2">
                <h1 className="font-bold text-lg">
                  &#8358;
                  {`${newData.rent.trim().slice(1)}${
                    newData.payment_schedule.trim().toLocaleLowerCase() ==
                    "yearly payment"
                      ? "/yr"
                      : "/mo"
                  }`}
                </h1>
                <p className="truncate w-[60%] font-bold text-black/70 text-sm">
                  {newData.location.split(",")[1] || "N/A"}
                </p>
              </div>
              <div className="flex text-sm text-black/60 space-x-4">
                <div className="flex space-x-2 items-center">
                  <UsersRound className="h-4" />
                  <p>3</p>
                </div>
                <p className="div">|</p>
                <div className="flex space-x-2 items-center">
                  <BedSingle className="h-4" />
                  <p>{newData.no_of_bedrooms}</p>
                </div>
                <p className="div">|</p>
                <div className="flex space-x-2 items-center">
                  <UsersRound className="h-4" />
                  <p>3</p>
                </div>
              </div>
            </div>
          </div>

          <hr />

          <div className="space-y-5">
            <h2 className="text-xl font-semibold">Price details</h2>
            <ul className="w-full text-sm space-y-3 font-light">
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>
                    Rent{" "}
                    {newData.payment_schedule.trim().toLocaleLowerCase() ==
                    "yearly payment"
                      ? "per year"
                      : "per month"}
                  </p>
                </div>
                <p>
                  &#8358;
                  {`${newData.rent.trim().slice(1)}${
                    newData.payment_schedule.trim().toLocaleLowerCase() ==
                    "yearly payment"
                      ? "/yr"
                      : "/mo"
                  }`}
                </p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Security bill</p>
                </div>
                <p>&#8358;{`${newData.security_deposit.trim().slice(1)}`}</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Utility bill</p>
                </div>
                <p>&#8358;{`${newData.utility_deposit.trim().slice(1)}`}</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Enviromental fee</p>
                </div>
                <p>&#8358;200.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>8/16 hours solar kit</p>
                </div>
                <p>&#8358;50,000.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Verdrooof service fee</p>
                </div>
                <p>&#8358;5000.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" /> <p>Agency fee</p>
                </div>
                <p>&#8358;0.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" /> <p>Agency fee</p>
                </div>
                <p>&#8358;0.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Inspection fee</p>
                </div>
                <p>&#8358;0.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" /> <p>Legal fee</p>
                </div>
                <p>&#8358;0.00</p>
              </li>
              <li className="flex justify-between">
                <div className="flex space-x-2 items-center">
                  <Info className="h-3 w-3 cursor-pointer" />{" "}
                  <p>Verdroof special offer</p>
                </div>
                <p>save 20%</p>
              </li>
            </ul>
          </div>

          <hr />

          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Price details</h2>
            <p>&#8358;800,000.00</p>
          </div>
        </div>
      )}
    </>
  );
}

export default function Account() {
  const [showDate, setShowDate] = useState(false);
  const [showType, setShowType] = useState(false);
  const [cancellationDate] = useState(getNext7DaysDate("2024-06-01"));
  const [inspectionDays] = useState<InspectionDay[]>(
    getNextThreeInspectionDays()
  );
  const [inspectionDay, setInspectionDay] = useState(inspectionDays[0].date);
  const [inspectionType, setInspectionType] = useState("Virtual");

  const getNextYear = () => {
    const date = Date.now();
    //add extra 7 days to the one completed year
    const year = 60000 * 60 * 24 * 372;
    const nextYear = date + year;
    const ans = new Date(nextYear);
    return ans.toDateString();
  };

  function getNext7DaysDate(initialDate: string | Date): string {
    const currentDate = new Date();
    const givenDate = new Date(initialDate);

    // Calculate the difference in time
    const diffTime = currentDate.getTime() - givenDate.getTime();

    // Convert time difference from milliseconds to days
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate how many 7-day intervals have passed since the given date
    const intervalsPassed = Math.floor(diffDays / 7);

    // Calculate the next 7-day interval date
    const nextDate = new Date(givenDate);
    nextDate.setDate(givenDate.getDate() + (intervalsPassed + 1) * 7);

    // Format the date as "Month Day, Year"
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return nextDate.toLocaleDateString("en-US", options);
  }

  function getNextThreeInspectionDays(): InspectionDay[] {
    const currentDate = new Date();
    const inspectionDays: InspectionDay[] = [];

    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);

      const options: Intl.DateTimeFormatOptions = {
        month: "long",
        day: "numeric",
      };
      const formattedDate = nextDate.toLocaleDateString("en-US", options);

      const [month, day] = formattedDate.split(" ");

      const formattedMMDDYYYY =
        (nextDate.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        nextDate.getDate().toString().padStart(2, "0") +
        "/" +
        nextDate.getFullYear();

      inspectionDays.push({
        month: month,
        day: day.replace(",", ""),
        date: formattedMMDDYYYY,
      });
    }

    return inspectionDays;
  }

  return (
    <div className="h-[100vh] bg-white text-black space-y-10 py-8 px-8 md:px-[5rem] font-dmsans">
      <div className="space-x-4 flex items-center">
        <ChevronLeft onClick={() => window.history.back()} />
        <h1 className=" text-xl md:text-3xl">Confirm and Rent</h1>
      </div>

      {
        <div className="flex flex-col md:flex-row w-full justify-between md:space-x-24">
          <section className="space-y-10">
            <div className="space-y-10">
              <h2 className="text-lg md:text-xl font-medium">
                Let&apos;s help you settle in nice and easy
              </h2>
              <div className="space-y-10">
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                  <div className="">
                    <h2 className="font-medium">Schedule a free inspection</h2>
                    <p className="text-xs w-[75%] text-black/70">
                      Tell us when you&apos;ll be available to view your
                      apartment
                    </p>
                  </div>
                  <div className="grid grid-cols-2 border relative rounded-lg border-black/30">
                    <div className="flex flex-col border-r border-r-black/30  p-2">
                      <label htmlFor="type" className="text-xs">
                        Type
                      </label>
                      <div
                        id="type"
                        onClick={() => setShowType(!showType)}
                        className="outline-none bg-transparent text-sm cursor-pointer"
                      >
                        {inspectionType}
                      </div>
                      {/* {errors.firstname && (
              <p className="text-red-500 text-sm">{errors.firstname.message}</p>
            )} */}
                    </div>
                    <div className="flex flex-col  p-2">
                      <label htmlFor="day" className="text-xs">
                        Day
                      </label>
                      <div
                        id="day"
                        onClick={() => setShowDate(!showDate)}
                        className="outline-none bg-transparent text-sm cursor-pointer"
                      >
                        {inspectionDay}
                      </div>
                      {showDate && (
                        <div className="flex space-x-8 p-2 rounded-lg absolute right-0 top-14 bg-white shadow-md">
                          {inspectionDays.map((day, idx) => (
                            <div
                              className="space-y-1 hover:bg-gray-100 max-h-20 flex flex-col cursor-pointer rounded-lg items-center w-20 p-2"
                              key={idx}
                              onClick={() => {
                                setInspectionDay(inspectionDays[idx].date);
                                setShowDate(!showDate);
                              }}
                            >
                              <p className="text-xs font-medium">
                                {day.month.toUpperCase()}
                              </p>
                              <p className="text-sm">{day.day}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* {errors.lastname && (
                      <p className="text-red-500 text-sm">{errors.lastname.message}</p>
                    )} */}
                    </div>
                    {showType && (
                      <div className="flex flex-col left-0 p-2 rounded-lg absolute top-14 bg-white shadow-md">
                        <p
                          onClick={() => {
                            setInspectionType("Virtual");
                            setShowType(!showType);
                          }}
                          className="w-full p-2 cursor-pointer hover:bg-gray-100 rounded-lg text-sm"
                        >
                          Virtual
                        </p>
                        <p
                          onClick={() => {
                            setInspectionType("In Person");
                            setShowType(!showType);
                          }}
                          className="w-full p-2 cursor-pointer hover:bg-gray-100 rounded-lg text-sm"
                        >
                          In Person
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
                  <div className="">
                    <h2 className="font-medium">Your arrival</h2>
                    <p className="text-xs w-[65%] text-black/70">
                      We never leave you stranded, let us know when you will be
                      moving in
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-col border rounded-lg border-black/30 w-min p-2">
                      <label htmlFor="date" className="text-xs">
                        Date
                      </label>
                      <input
                        id="date"
                        type="date"
                        className="outline-none text-sm bg-transparent"
                      />
                      {/* {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="space-y-6">
              <h2 className="text-xl font-medium">
                Hot deals on our solar kits
              </h2>
              <p className="w-[80%] text-sm leading-relaxed">Coming soon...</p>
            </div>

            <hr />

            <div className="space-y-6">
              <h2 className="text-xl font-medium">Find a roommate</h2>
              <p className="w-[80%] text-sm leading-relaxed">Coming soon...</p>
            </div>

            <hr />

            <div className="md:hidden">
              <Reciept />
            </div>

            <hr />

            <div className="space-y-6">
              <h2 className="text-xl font-medium">Cancellation Policy</h2>
              <p className="w-full md:w-[80%] text-sm leading-relaxed">
                Review the Host&apos;s full cancellation policy, which applies
                even if you cancel for travel restrictions, epidemic, strike,
                natural disaster, riots, acts of wars, hostilities, invasions,
                civil war, protest, bombing, rebellions, insurrection, etc.
                Cancel on or before{" "}
                <span className="font-bold">{cancellationDate} 12 P.M </span>for
                a full refund
              </p>
            </div>

            <hr />

            <div className="pb-8 space-y-8">
              <p className="text-xs">
                By selecting the button below, I agree to the Renter&apos;s
                House Rules, Ground rules for guests, Verdroof&apos;s Renting
                and Refund Policy, and that Airbnb can charge my payment method
                if I&apos;m responsible for damage.
              </p>
              <button className="btn hover:animate-pulse">
                Confirm and Pay
              </button>
            </div>
          </section>

          <section className="hidden md:block min-w-[30rem]">
            <Reciept />
          </section>
        </div>
      }

      {/* <section className="pt-10 space-y-1">
        <div className="flex items-center">
          <ChevronLeft className="w-[2rem] cursor-pointer" onClick={()=>window.history.back()}/>
          <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
        </div>
        <p className="font-bold text-black/70">
          Pay for property #233JEDTSG
        </p>
      </section>

      <section className="pb-5 space-x-2">
        <div className="flex justify-between items-center">
          <p className="mt-5 max-w-[70%]">Choose the date you plan to pack in, so our agent would be available to check you in.</p>

          <label htmlFor="dateInput">
            <div className="cursor-pointer underline relative font-semibold" onClick={(e) => { setShowDate(!showDate); }}>
              pick date

              {showDate && <DateTimeComponent />}
            </div>
          </label>
          <input type="date" name="dateInput" id="dateInput" className="hidden" />
        </div>
      </section>

      <section className="flex flex-wrap justify-between py-5">
        <div className="rounded-lg p-5 cursor-pointer shadow-lg h-full space-y-5 outline outline-black/5 w-full md:w-[60%]  mt-5">
          <div className="p-2 md:px-5 space-y-5">
            <p className="text-lg font-semibold text-left">Billing Information</p>
            <input type="text" name="name" value={'Tobechukwu Onuigbo'} className='bg-[#FAFAFA] w-full px-4 py-3 rounded-md' placeholder='FullName' disabled />
            <input type="date" name="date" value={'sureboytobi@gmail.com'} className='bg-[#FAFAFA] w-full px-4 py-3 rounded-md' placeholder='date' disabled />
            <hr />
            <p className="text-lg font-semibold text-left">Item Details</p>
            <Link href={"/buy/listing/housing-1345"} className="flex space-x-4">
              <diviv className='flex items-center space-x <Info className="h-4 w-5" />-2 items-center'>
                block overflow-hidd3n m30'}> <p><div className={'h-[70px] w-[100px]  cursor-pointerrelative inline-</p>
                div <Image
                    fill={true}
                    alt="building"
                    src="/images/checkout.avif"
                    className="h-full w-full object-cover absolute"
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <p className='text-md font-bold text-[#6E6E6E] w-fit'>Beautiful Green Powered Space</p>
                  <div className='text-sm text-[#6E6E6E] flex items-center'>15 Asokoro Road, Abuja </div>
                  <div className="flex flex-wrap">
                    <div className='px-3 bg-[#C1C1C1] rounded-xl text-[#6E6E6E] mr-2 mt-2'>
                      Swimming Pool
                    </div>

                    <div className='px-3 bg-[#C1C1C1] rounded-xl text-[#6E6E6E] mr-2 mt-2'>
                      10kva Solar Power
                    </div>
                  </div>
                </div>
              </div>
            </Link>


            <hr />

            <div className="flex justify-between items-center">
              <p className="">Duration</p>
              <p className="">12 months</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="">Earliest move in</p>
              <p className="">Today</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="">Latest move out</p>
              <p className="">{getNextYear()}</p>
            </div>

          </div>
        </div>

        <div className="rounded-lg p-5 cursor-pointer shadow-lg h-full space-y-5 outline outline-black/5 w-full md:w-[35%] my-5">
          <div className="p-2 md:px-5 space-y-5">
            <p className="text-lg font-semibold text-left">Cost Breakdown</p>

            <div className="flex justify-between items-center">
              <p>Rent (Per Year)</p>
              <p>&#8358;300,000.00</p>
            </div>

            <div className="flex justify-between items-center">
              <p>2KVA Solar Kit (Per Year)</p>
              <p>&#8358;200,000.00</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="cursor-pointer underline relative" onClick={(e) => { setShowVerdroof(!showVerdroof); setShowVat(false) }}>
                Verdroof Service Charge
                {showVerdroof && <div className="w-full md:w-[20rem] min-h-[10vh] space-y-3 shadow-lg absolute bg-white right-1 p-2 rounded-lg bottom-[2rem]" onClick={(e) => e.stopPropagation()}>
                  <div className="flex">
                    <X className="w-[3rem] mr-2" onClick={(e) => setShowVerdroof(false)} /> <p>This helps us run our platform and offer services like 24/7 support on your trip.</p>
                  </div>
                </div>}
              </div>
              <p>&#8358;20,000.00</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="cursor-pointer underline relative" onClick={(e) => { setShowVat(!showVat); setShowVerdroof(false); }}>
                Value Added Tax(7.5%)
                {showVat && <div className="w-full md:w-[20rem] min-h-[10vh] space-y-3 shadow-lg absolute bg-white right-1 p-2 rounded-lg bottom-[2rem]" onClick={(e) => e.stopPropagation()}>
                  <div className="flex">
                    <X className="w-[3rem] mr-2" onClick={(e) => setShowVat(false)} /> <p>This is a statutory value added tax paid to the government.</p>
                  </div>
                </div>}
              </div>
              <p>&#8358;30,000.00</p>
            </div>


            <div className="flex justify-between items-center">
              <p className="font-bold">Sum Total</p>
              <p className="font-bold">&#8358;550,000.00</p>
            </div>

            <button
              className="btn"
              onClick={() => alert('checkout')}
            >
              Complete Checkout
            </button>


          </div>
        </div>
      </section> */}
    </div>
  );
}
