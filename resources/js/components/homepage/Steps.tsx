import {
    Clock,
    Package,
    ShoppingCart,
    Star,
    UserPlus,
    Utensils,
} from 'lucide-react';

export function Steps() {
    const steps = [
        {
            icon: UserPlus,
            title: 'Create Account',
            description:
                'Sign up in seconds and get access to exclusive meal plans tailored to your dietary preferences.',
        },
        {
            icon: ShoppingCart,
            title: 'Choose Your Meals',
            description:
                'Browse our curated menu of fresh, chef-prepared dishes and select your favorites for the week.',
        },
        {
            icon: Package,
            title: 'Customize Your Plan',
            description:
                'Select your portion sizes, delivery frequency, and dietary requirements to fit your lifestyle.',
        },
        {
            icon: Clock,
            title: 'Track Your Order',
            description:
                'Get real-time updates on your delivery status and know exactly when your fresh meals will arrive.',
        },
        {
            icon: Utensils,
            title: 'Heat & Enjoy',
            description:
                'Simply heat up your meal in minutes and enjoy restaurant-quality food in the comfort of your home.',
        },
        {
            icon: Star,
            title: 'Rate & Review',
            description:
                'Share your experience and help us improve our menu based on your feedback and preferences.',
        },
    ];

    return (
        <section className="mx-auto max-w-6xl py-20">
            {/* Section Header */}
            <div className="mb-16 text-center">
                <h2 className="mb-2 text-3xl font-bold text-orange-600 md:text-4xl">
                    Simple Process
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                    From kitchen to your table in three easy steps
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid gap-8 md:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div
                            key={index}
                            className="group relative rounded-xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-lg"
                        >
                            {/* Step Number */}
                            <div className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
                                <span>{index + 1}</span>
                            </div>

                            {/* Icon */}
                            <div className="mb-6">
                                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600">
                                    <Icon
                                        className="h-7 w-7 text-white"
                                        strokeWidth={2}
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="mb-3 text-gray-900">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
