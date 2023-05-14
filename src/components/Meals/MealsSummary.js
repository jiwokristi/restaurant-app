import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Our Menu</h2>
      <p>
        We purchase our ingredients in the morning daily to give you the best
        quality food!
      </p>
      <p>Open Hours: Everyday 10:00-22:00</p>
    </section>
  );
};

export default MealsSummary;
