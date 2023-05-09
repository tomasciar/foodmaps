import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import aw1 from '../../public/images/tips&tricks/a&w_order_1.jpeg';
import aw2 from '../../public/images/tips&tricks/a&w_order_2.jpeg';

/**
 * @route Tips & Tricks
 * @returns {JSX.Element}
 */
export default function TipsAndTricks(): JSX.Element {
  return (
    <>
      <Head>
        <title>Foodmaps | Tips & Tricks</title>
        <meta
          name='description'
          content='Food deal aggregation website that finds all of the major food deals in a searched area'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div style={{ padding: '1rem 14rem 4rem 14rem' }}>
          <h2>How to Enjoy Delicious Meals for Only $15 Per Day</h2>
          <p>
            Are you tired of cooking and looking for a way to enjoy restaurant-quality meals without breaking the bank?
            Look no further! This savvy trick can save you a lot of money, especially if you aren't a picky eater. The
            secret lies in maximizing your savings on Uber Eats by combining Buy 1 Get 1 Free (BOGO) deals with discount
            coupons. While it may sound too good to be true, many Uber Eats users consistently receive 40% off coupons,
            making this money-saving hack a reality. Here's a step-by-step guide on how to make it work for you:
          </p>
          <ol>
            <li>
              Ensure that you have a "Spend $40, Save 40%" coupon available. If you're ordering with a group, the
              likelihood of someone having a coupon is relatively high.
            </li>
            <li>
              Add BOGO items to your cart until the total value reaches at least $20. Aim to be as close to $20 as
              possible, but going slightly over is still fine.
            </li>
            <li>Apply the coupon to your order.</li>
            <li>
              During checkout, confirm that both the BOGO and "Spend $40, Save 40%" discounts have been applied to your
              order.
            </li>
          </ol>
          <p>
            You might wonder how this hack saves you 40% when you're only spending $20. The trick is that by choosing
            $20 worth of BOGO items, the Uber Eats app perceives your spending as $40, meeting the minimum threshold for
            the coupon to work. This results in a significant discount, making your meal even cheaper than the menu
            price.
          </p>
          <p>
            For example, if you wanted to order 2 Teen Burger Combos and 2 Spicy Habanero Chicken Burgers (BOGO items)
            from A&W, it would cost $55.12 at the restaurant. By using this method, including delivery fees and a $3
            tip, the total comes to just $24.10! You'll save money while having your meal conveniently delivered to your
            doorstep.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              columnGap: '4rem',
              padding: '2rem'
            }}>
            <Image src={aw1} alt='deal visualization' height={500} />
            <Image src={aw2} alt='deal visualization' height={500} />
          </div>
          <p>
            You may think this strategy is unsustainable, but with the wide variety of BOGO offers available in
            populated areas, it's entirely possible to maintain this cost-saving approach. If you live with roommates,
            the chances are even higher that someone will have a coupon to use. Some users receive more coupons than
            others, making this hack feasible even for solo orders, though slightly more challenging.
          </p>
          <p>
            I've personally ordered from Uber Eats hundreds of times using this trick, saving myself and my friends
            thousands of dollars. By tipping on every order, I've managed to spend an average of $15 per day on
            delicious meals, all without cooking or grocery shopping. While I don't eat breakfast, two substantial meals
            for $15 per day is a great deal.
          </p>
          <p>
            To make it even easier, check out the Foodmaps Search section, where I've included a BOGO filter. This
            feature allows you to quickly find all the BOGO deals on Uber Eats, so you can apply this strategy and save
            money on your next order. Enjoy!
          </p>
        </div>
      </main>
    </>
  );
}
