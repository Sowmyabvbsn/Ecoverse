import { Button } from "../ui/button";
import { Input } from "../ui/input";

const JoinUS = () => {
  return (
    <section className='bg-green-100 py-12 md:py-16'>
      <div className='container px-4 text-center'>
        <h2 className='section-heading'>Join Our Eco-Conscious Community</h2>
        <p className='text-lg text-green-700 mb-8'>
          Subscribe to our newsletter for exclusive eco-friendly deals and
          sustainability tips.
        </p>
        <form className='max-w-md mx-auto flex flex-col sm:flex-row gap-4'>
          <Input
            type='email'
            placeholder='Your email address'
            className='flex-grow bg-white'
          />
          <Button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white'
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default JoinUS;
