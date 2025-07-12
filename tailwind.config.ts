import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'xs': '475px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				ninja: {
					purple: 'hsl(var(--ninja-purple))',
					blue: 'hsl(var(--ninja-blue))',
					'light-purple': 'hsl(var(--ninja-light-purple))',
					'dark-blue': 'hsl(var(--ninja-dark-blue))',
					accent: 'hsl(var(--ninja-accent))',
					// Legacy support
					gold: 'hsl(var(--ninja-purple))',
					silver: 'hsl(var(--ninja-light-purple))',
					dark: 'hsl(var(--ninja-dark-blue))',
					darker: 'hsl(var(--ninja-dark-blue))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'coin-spin': {
					'0%': { transform: 'rotateY(0deg)' },
					'100%': { transform: 'rotateY(360deg)' }
				},
				'ninja-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--ninja-purple) / 0.5)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--ninja-purple) / 0.8)' }
				},
				'bounce-in': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.3) translateY(100px)' 
					},
					'50%': { 
						opacity: '1', 
						transform: 'scale(1.05) translateY(-10px)' 
					},
					'70%': { 
						transform: 'scale(0.9) translateY(0px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1) translateY(0px)' 
					}
				},
				'slide-up': {
					'0%': { 
						opacity: '0', 
						transform: 'translateY(50px)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'translateY(0px)' 
					}
				},
				'fade-in-scale': {
					'0%': { 
						opacity: '0', 
						transform: 'scale(0.8)' 
					},
					'100%': { 
						opacity: '1', 
						transform: 'scale(1)' 
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'pulse-glow': {
					'0%': { 
						boxShadow: '0 0 0 0 hsl(var(--ninja-gold) / 0.7)' 
					},
					'70%': { 
						boxShadow: '0 0 0 20px hsl(var(--ninja-gold) / 0)' 
					},
					'100%': { 
						boxShadow: '0 0 0 0 hsl(var(--ninja-gold) / 0)' 
					}
				},
				'ninja-entrance': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3) rotate(-180deg) translateY(100px)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.1) rotate(-90deg) translateY(-20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) rotate(0deg) translateY(0px)'
					}
				},
				'ninja-stealth': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px) scale(0.8)',
						filter: 'blur(10px)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'translateX(10px) scale(1.05)',
						filter: 'blur(2px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0px) scale(1)',
						filter: 'blur(0px)'
					}
				},
				'ninja-shadow-drop': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-50px) scale(0.5)',
						filter: 'drop-shadow(0 0 0 transparent)'
					},
					'50%': {
						opacity: '0.8',
						transform: 'translateY(5px) scale(1.1)',
						filter: 'drop-shadow(0 10px 20px hsl(var(--ninja-purple) / 0.5))'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0px) scale(1)',
						filter: 'drop-shadow(0 5px 15px hsl(var(--ninja-purple) / 0.3))'
					}
				},
				'ninja-shuriken-spin': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3)',
						boxShadow: '0 0 0 0 hsl(var(--ninja-gold) / 0)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.2)',
						boxShadow: '0 0 30px 10px hsl(var(--ninja-gold) / 0.4)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
						boxShadow: '0 0 20px 5px hsl(var(--ninja-gold) / 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'coin-spin': 'coin-spin 2s linear infinite',
				'ninja-glow': 'ninja-glow 2s ease-in-out infinite',
				'bounce-in': 'bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'slide-up': 'slide-up 0.6s ease-out',
				'fade-in-scale': 'fade-in-scale 0.5s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s infinite',
				'ninja-entrance': 'ninja-entrance 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'ninja-stealth': 'ninja-stealth 1s ease-out',
				'ninja-shadow-drop': 'ninja-shadow-drop 0.8s ease-out',
				'ninja-shuriken-spin': 'ninja-shuriken-spin 1.5s ease-out'
			},
			backgroundImage: {
				'gradient-ninja': 'var(--gradient-ninja)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'ninja': 'var(--shadow-ninja)',
				'gold': 'var(--shadow-gold)',
				'elevated': 'var(--shadow-elevated)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;