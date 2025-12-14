DateMalformedIntervalStringException

Unknown or bad format (PT-2M)

at database\factories\OrderFactory.php:30
26▕ // Generate a base time
27▕ $confirmed_at = $this->faker->dateTimeBetween('-2 years', 'now');
28▕ $processed_at = (clone $confirmed_at)->add(new \DateInterval('PT' . $this->faker->numberBetween(5, 20) . 'M'));
29▕ $estimated_delivery_at = (clone $processed_at)->add(new \DateInterval('PT' . $this->faker->numberBetween(20, 60) . 'M'));
➜ 30▕ $delivered_at = $status === 'completed' ? (clone $estimated_delivery_at)->add(new \DateInterval('PT' . $this->faker->numberBetween(-10, 20) . 'M')) : null;
31▕
32▕
33▕ return [
34▕ 'user_id' => User::factory(),

1 database\factories\OrderFactory.php:30
DateInterval::\_\_construct("PT-2M")

2 vendor\laravel\framework\src\Illuminate\Database\Eloquent\Factories\Factory.php:524
Database\Factories\OrderFactory::definition()
