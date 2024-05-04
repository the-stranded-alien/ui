import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const Particle = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async (container) => {
        await container;
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: 'push',
                        },
                        onHover: {
                            enable: true,
                            mode: 'repulse',
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 2,
                        },
                        repulse: {
                            distance: 100,
                            duration: 0.5,
                        },
                    },
                },
                particles: {
                    color: {
                        value: '#e0b0ff',
                    },
                    move: {
                        direction: 'none',
                        enable: true,
                        outModes: {
                            default: 'bounce',
                        },
                        random: false,
                        speed: 2,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 400,
                        },
                        value: 50,
                    },
                    opacity: {
                        value: 0.4,
                    },
                    shape: {
                        type: 'circle',
                    },
                    size: {
                        value: { min: 2, max: 5 },
                    },
                },
                detectRetina: true,
            }}
        />
    );
};

export default Particle;
