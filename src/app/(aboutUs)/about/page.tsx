import React from 'react';

// The About component
const About = () => {
    // Page content data
    const content = [
        {
            title: 'Our Vision',
            text: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Montes ipsum ex sit; imperdiet tortor tempor iaculis. Ligula non nostra ligula nullam neque, ornare mauris. Varius vestibulum lectus et maecenas adipiscing tortor nisi tempor nam. Eleifend fames hac vitae quis elementum at? Senectus mus ultricies eleifend maximus iaculis malesuada.',
        },
        {
            title: 'Our Mission',
            text: 'Netus phasellus efficitur suspendisse enim lacinia convallis mattis. Nascetur habitasse fermentum diam imperdiet cubilia; feugiat vel pharetra. Molestie commodo semper placerat mi eros. Justo libero posuere risus convallis a. Ligula imperdiet odio vitae ut habitasse tristique interdum sit.',
        },
        {
            title: 'Our Values',
            text: 'Consequat dui inceptos venenatis habitasse suspendisse praesent lobortis nec. Rhoncus consequat dapibus dapibus nec habitant venenatis. Egestas vulputate nunc eu egestas sapien nascetur. Fames lectus rhoncus ornare malesuada dis hac sollicitudin aenean.',
        }, 
        {
            title: 'Our Goals',
            text: 'Consequat dui inceptos venenatis habitasse suspendisse praesent lobortis nec. Rhoncus consequat dapibus dapibus nec habitant venenatis. Egestas vulputate nunc eu egestas sapien nascetur. Fames lectus rhoncus ornare malesuada dis hac sollicitudin aenean.',
        },
        {
            title: 'Our Ideology',
            text: 'Consequat dui inceptos venenatis habitasse suspendisse praesent lobortis nec. Rhoncus consequat dapibus dapibus nec habitant venenatis. Egestas vulputate nunc eu egestas sapien nascetur. Fames lectus rhoncus ornare malesuada dis hac sollicitudin aenean.',
        },
    ];

    return (
        <main className="wrapper p-6">
            {/* Page Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">About Us</h1>
                <p className="text-gray-600 mt-2">
                    Learn more about who we are and what we stand for
                </p>
            </div>

            {/* Page Content */}
            <section className="space-y-6">
                {content.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-6"
                    >
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            {item.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </section>
        </main>
    );
};

export default About;
