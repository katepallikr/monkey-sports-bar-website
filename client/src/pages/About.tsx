import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="bg-neutral-100 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white p-12 rounded-xl shadow-lg border border-neutral-200">
            <h1 className="text-5xl font-display font-black uppercase text-center mb-12 text-neutral-900">Our Story</h1>
            
            <div className="prose prose-lg mx-auto text-neutral-600 font-body">
              <p className="lead text-xl font-bold text-neutral-800">
                It all started with five friends, a love for the game, and a quest for the perfect wing sauce.
              </p>
              
              <p>
                Founded in 2010, 5 Monkeys Sports Bar & Restaurant wasn't built by corporate suits. It was built by fans, for fans. We wanted a place where the beer was always ice cold, the screens were huge, and the food was more than just an afterthought.
              </p>
              
              <h3 className="text-2xl font-display font-bold text-primary uppercase mt-8 mb-4">The Legend of the 5 Monkeys</h3>
              <p>
                Why "5 Monkeys"? Legend has it that the founders were once kicked out of a quiet library for cheering too loud at a football game stream on a phone. Someone shouted, "You act like a bunch of monkeys!" 
              </p>
              <p>
                Instead of being offended, we owned it. We realized the world needs places where you can be loud, be wild, and go bananas when your team scores. That's the spirit we bring to every location, every day.
              </p>

              <div className="my-12 p-8 bg-neutral-900 text-white rounded-lg text-center">
                <h4 className="text-3xl font-display font-bold uppercase mb-4 text-primary">Our Promise</h4>
                <p className="text-lg italic">
                  "Cold Beer. Hot Wings. Every Game. No Excuses."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
