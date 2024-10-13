interface WeatherProps {
  location: string;
  amount: number;
}

const CurrencyConvertion = ({ amount, location }: WeatherProps) => {
  return (
    <div className="border border-neutral-200 p-4 rounded-lg max-w-fit">
      The value of money in {location} is {amount} $
    </div>
  );
};
export default CurrencyConvertion;
