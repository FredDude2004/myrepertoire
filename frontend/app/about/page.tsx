import React from 'react';
import { HeroHeader } from '../../components/ui/header';
import './about.css';

function MyMarkdownPage() {
    return (
        <>
            <HeroHeader />
            <div className="about-container">
                <header>
                    <h1>About</h1>
                    <h2>What is it?</h2>
                    <p><strong>myrepertoire.io</strong> is a platform designed to help you gain a stronger grip on your personal openings repertoire. It is largely inspired by Gotham Chess’s platform <a href="https://chessly.com" target="_blank">Chessly.com</a>.</p>
                </header>

                <main>
                    <section>
                        <p>On Chessly, International Master Levy Rozman provides openings coaching, recommendations, and tools to understand and remember lines. The site also offers courses covering the opening, middlegame, and endgame, and has grown significantly with many features to enhance your chess game.</p>

                        <p>My favorite feature on Chessly was the <strong>Drills</strong>. After watching video lessons and going through the opening lines, you could quiz yourself in an interactive environment, with the computer playing your opponent’s moves. This tool was a game changer for memorization and directly inspired me to build <strong>myrepertoire.io</strong>.</p>
                    </section>

                    <section>
                        <h2>What’s Different</h2>
                        <p>While Chessly is a fantastic platform with Levy’s structured recommendations, the key difference here is that <strong>you</strong> can create your own lines for drilling, rather than being restricted to the material taught in a course.</p>

                        <p>This gives you the freedom to build and customize your repertoire however you want. Want to memorize 37 moves of Bongcloud theory? You can absolutely do that here. Now you probably aren’t an International Master, so your repertoire might not rival Levy’s, but the flexibility allows you to improve through your own discoveries.</p>

                        <p>Here’s a general flow:</p>
                        <br />
                        <ol>
                            <li>Get fried in the opening</li>
                            <li>Deny &gt; Rage &gt; Bargain &gt; Cry &gt; Accept</li>
                            <li>Analyze the game with an engine and correct the opening mistakes</li>
                            <li>Copy the PGN and create a new line</li>
                            <li>Drill it until it’s melted into your brain</li>
                            <li>Profit</li>
                        </ol>
                        <br />

                        <p>By actively building and correcting your repertoire, you gain a deep understanding of each move that pays off long-term. Now once again I’m assuming that the users here aren’t at the master level (yet). So when you are building your opening, it is best not to reinvent the wheel. I would recommend that you find a reputable opening that you find interesting and copy the main line, and from there as you continue to play games and make mistakes, fill in the gaps that the main line doesn’t provide. Use the engine to ensure that you are making the right adjustments and not just using ‘feeling’.
                        </p>
                    </section>

                    <section>
                        <h2>How It Works</h2>
                        <p>Getting started is simple:</p>
                        <br />
                        <ol>
                            <li>Create an account.</li>
                            <li>Open an analysis board on <a href="https://www.chess.com/analysis" target="_blank">chess.com</a> or <a href="https://lichess.org/analysis" target="_blank">lichess.org</a>.</li>
                            <li>Play through the moves of the line you want and copy the PGN.</li>
                            <li>Go to your <strong>Repertoire</strong> page, fill out the form, and click <em>Create New Line</em>.</li>
                            <li>Select your line, check the box, and click <em>Start Drilling</em> to master it.</li>
                        </ol>
                        <br />
                        -
                        <p>One of the best features of myrepertoire.io <strong>Variation Folding</strong>. For example:</p>
                        <br />
                        <pre>1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 (3... Nf6 4. O-O) 4. Ba4 *</pre>
                        <br />

                        <p>This Ruy Lopez main line also contains the Berlin Defense as a variation. When drilling, you’ll be taken through both lines seamlessly.</p>

                        <p>To stay organized, store moves and variations under one opening. When expanding a line, simply copy it back into an analysis board, add new branches, and save it again.</p>
                    </section>

                    <section className="disclaimer">
                        <h2>Disclaimer</h2>
                        <p>This site is in its early stages, so you may encounter bugs or errors. I ask for your patience—this is a personal project I’ve wanted ever since becoming a proud owner of <em>“e4 New York Style”</em>.</p>

                        <p>If you run into issues, please visit my <a href="https://github.com/FredDude2004/myrepertoire.io" target="_blank">GitHub</a> and submit an issue (and maybe leave a star!). The more detailed the report, the better.</p>
                    </section>
                </main>
            </div>
        </>
    );
}

export default MyMarkdownPage;
