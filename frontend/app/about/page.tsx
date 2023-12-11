import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUsPage = () => {
  return (
    <>
      <div className="w-full text-center">
        <h1 className="ml-2 text-3xl font-bold">About Us</h1>
      </div>

      <div className="w-full max-w-4xl p-4 mx-auto">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Who We Are</h2>
            <p className="text-md text-gray-700 mb-10">
              We are a <span className="font-semibold">leading e-commerce platform</span> committed
              to providing an unrivaled selection of high-quality products, an easy shopping
              experience, prompt delivery, and exceptional customer service.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h2>
            <p className="text-md text-gray-700 mb-10">
              Our team works around the clock to find, create, manufacture, and ship you the most
              innovative products. This way you know you are{' '}
              <span className="font-semibold">guaranteed to have the coolest things</span> money can
              buy without spending days researching on your own.
            </p>

            <h2 className="text-xl font-semibold text-gray-800 mb-2">Join Us</h2>
            <p className="text-md text-gray-700 mb-10">
              Trust our team of experts to help you stay ahead of the curve, and always be on the
              cutting edge of technology.{' '}
              <span className="font-semibold">Join our product revolution</span> as we continuously
              challenge what is possible in your life and help bring awesomeness worldwide.
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AboutUsPage;
