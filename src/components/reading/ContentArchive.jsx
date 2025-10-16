import React, { useState } from 'react';
import { ArrowLeft, Clock, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import ContentCard from './ContentCard';
import ContentDetail from './ContentDetail';

// Static content data
const contentData = {
  astrology: [
    {
      id: 'birth-chart-love',
      category: 'ASTROLOGY',
      readTime: '8 min',
      title: 'What Your Birth Chart Reveals About How You Love',
      description: 'Your birth chart is a cosmic map that reveals not just who you are, but how you love, connect, and build relationships. Understanding these patterns helps you embrace your authentic way of loving.',
      content: `Your birth chart is a cosmic map that reveals not just who you are, but how you love, connect, and build relationships. Understanding these patterns helps you embrace your authentic way of loving.

**Venus: Your Love Language**
Venus in your chart shows how you give and receive love. Venus in Fire signs (Aries, Leo, Sagittarius) loves passionately and spontaneously. Venus in Earth signs (Taurus, Virgo, Capricorn) shows love through actions and stability. Venus in Air signs (Gemini, Libra, Aquarius) connects through communication and mental stimulation. Venus in Water signs (Cancer, Scorpio, Pisces) loves deeply and emotionally.

**Mars: Your Desire Nature**
Mars reveals what ignites your passion and how you pursue what you want. This planet shows your sexual energy and how you assert yourself in relationships. A strong Mars placement indicates direct pursuit, while softer aspects suggest a more subtle approach.

**Moon: Your Emotional Needs**
Your Moon sign reveals what makes you feel emotionally secure in love. This is often more important than your Sun sign for long-term relationship compatibility. Understanding your Moon needs helps you communicate what truly nurtures your heart.

**The 7th House: Partnership Patterns**
The 7th house and its ruler describe the type of partner you attract and the lessons you'll learn through relationships. Planets in this house significantly influence your relationship dynamics and what you seek in a committed partnership.

**Aspects to Venus and Mars**
The aspects (angles) between Venus, Mars, and other planets reveal the complexity of your love nature. Challenging aspects might indicate lessons to learn, while harmonious aspects show natural gifts in relating to others.

**Your Descendant Sign**
The sign on the cusp of your 7th house (Descendant) often describes qualities you seek in a partner - traits that complement and balance your Ascendant. This axis reveals the dance between self and other in relationships.

Understanding your birth chart's love indicators helps you embrace your unique way of connecting, recognize compatible partners, and work consciously with your relationship patterns.`,
      image: 'https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f5?w=400'
    },
    {
      id: 'opposite-signs',
      category: 'ASTROLOGY',
      readTime: '7 min',
      title: 'Compatibility vs Resonance: Why Opposite Signs Can Work',
      description: 'Opposite signs in the zodiac create a magnetic attraction. While they may seem incompatible at first, these relationships offer the greatest potential for growth and completion.',
      content: `Opposite signs in the zodiac create a magnetic attraction. While they may seem incompatible at first, these relationships offer the greatest potential for growth and completion.

**The Axis of Wholeness**
In astrology, opposite signs sit 180 degrees apart on the zodiac wheel. They represent two sides of the same axis, each holding qualities the other needs to integrate. Together, they create wholeness.

**Aries & Libra: Self vs Other**
Aries teaches Libra about independence and self-assertion, while Libra teaches Aries about partnership and consideration. Together, they balance "I am" with "We are."

**Taurus & Scorpio: Security vs Transformation**
Taurus brings stability to Scorpio's intensity, while Scorpio helps Taurus embrace transformation. This axis teaches that true security comes from accepting change.

**Gemini & Sagittarius: Details vs Big Picture**
Gemini's curiosity meets Sagittarius's wisdom. Gemini teaches Sagittarius to appreciate life's details, while Sagittarius shows Gemini the meaning behind information.

**Cancer & Capricorn: Feeling vs Structure**
Cancer brings emotional depth to Capricorn's ambitions, while Capricorn provides structure for Cancer's feelings. This axis balances nurturing with achievement.

**Leo & Aquarius: Individual vs Collective**
Leo's self-expression meets Aquarius's humanitarian vision. Leo teaches Aquarius about personal creativity, while Aquarius shows Leo the power of collective consciousness.

**Virgo & Pisces: Analysis vs Intuition**
Virgo's discernment grounds Pisces's dreams, while Pisces helps Virgo connect to divine inspiration. This axis integrates the practical with the mystical.

**Making Opposite Signs Work**
Success requires embracing both energies rather than trying to change your partner. Respect differences, learn from each other's strengths, and recognize that your partner offers exactly what you need to grow.

The magnetic pull between opposites isn't about easy compatibility - it's about the soul's desire for completion and evolution through relationship.`,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
    },
    {
      id: 'karmic-astrology',
      category: 'ASTROLOGY',
      readTime: '9 min',
      title: 'Karmic Astrology: What Your Chart Says About Past Life Loves',
      description: 'Certain placements in your birth chart reveal soul connections from other lifetimes. Understanding these karmic patterns helps you navigate destined relationships with awareness.',
      content: `Certain placements in your birth chart reveal soul connections from other lifetimes. Understanding these karmic patterns helps you navigate destined relationships with awareness.

**The Lunar Nodes: Your Soul's Journey**
The South Node represents where you've been - patterns, gifts, and lessons from past lives. The North Node shows where you're headed - your soul's growth direction. Relationships that activate your nodes are rarely accidental.

**South Node Relationships**
When someone's planets touch your South Node, you recognize them instantly. There's familiarity, comfort, and often an immediate deep connection. These are past life relationships returning for completion or evolution.

**North Node Relationships**
Connections to your North Node feel challenging yet magnetic. These people catalyze your growth, pushing you toward your soul's purpose. Though uncomfortable at times, these relationships are essential for your evolution.

**Saturn: The Karmic Taskmaster**
Saturn aspects between charts indicate karmic debts, lessons, or commitments from other lives. Saturn conjunct Venus suggests a relationship requiring maturity and patience. Saturn-Moon aspects indicate deep emotional karma to resolve.

**Pluto: Soul-Level Transformation**
Pluto connections signify profound soul contracts. These relationships transform you at the deepest level, often through intense experiences. Pluto aspects reveal power dynamics and transformational themes carried from past lives.

**The 12th House: Hidden Karma**
Planets in your partner's 12th house, or theirs in yours, indicate karmic secrets, hidden patterns, or unconscious bonds. These connections often feel mysterious, spiritual, or somehow fated.

**Vertex: The Point of Fate**
The Vertex, called the "point of fate," represents relationships and events that feel destined. When activated by another's planets, especially personal planets, the connection feels inevitable and significant.

**Neptune: Spiritual Recognition**
Neptune aspects between charts indicate spiritual or mystical connections from past lives. These relationships often have a dreamy, otherworldly quality. Be mindful of idealization while honoring the spiritual dimension.

**Working With Karmic Patterns**
Recognizing karmic connections helps you approach them consciously. Ask: What am I here to learn? What pattern am I meant to heal? How can this relationship serve both our souls' evolution?

Not all karmic relationships are meant to last forever. Some come to complete unfinished business, teach a specific lesson, or help you break old patterns. Honor the purpose, learn the lesson, and release with gratitude when the time comes.`,
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400'
    },
    {
      id: 'intense-vs-stable-signs',
      category: 'ASTROLOGY',
      readTime: '6 min',
      title: 'The Most Intense and Most Stable Signs in Love',
      description: 'Each zodiac sign brings a unique energy to relationships. Some signs love with fierce intensity, while others offer steady, unwavering devotion.',
      content: `Each zodiac sign brings a unique energy to relationships. Some signs love with fierce intensity, while others offer steady, unwavering devotion.

**Most Intense Signs in Love**

**Scorpio: The Depth Seeker**
Scorpio doesn't do anything halfway, especially love. They dive into emotional depths most signs fear to explore. Loyal to death, but betrayal is unforgivable. Their love transforms you at a soul level.

**Aries: The Passionate Warrior**
Aries loves with fierce, spontaneous passion. They pursue what they want with courage and directness. Their intensity burns bright and hot, though it may need conscious effort to maintain long-term.

**Leo: The Devoted Lover**
Leo's intensity comes from their wholehearted commitment. When they love, they love grandly, generously, and with dramatic flair. Their pride means they expect loyalty and adoration in return.

**Pisces: The Emotional Empath**
Pisces merges completely with their beloved, feeling everything intensely. Their love is compassionate, sacrificial, and deeply spiritual. They can lose themselves in love, making boundaries essential.

**Most Stable Signs in Love**

**Taurus: The Steadfast Partner**
Taurus offers unwavering loyalty and practical devotion. They build relationships slowly but once committed, they're incredibly reliable. Security, sensuality, and consistency define their love.

**Capricorn: The Committed Provider**
Capricorn takes relationships seriously, approaching love with maturity and responsibility. They demonstrate love through actions, commitment, and building a secure future together.

**Cancer: The Nurturing Caretaker**
Cancer's stability comes from their deep need for emotional security. Once they trust you, they create a safe, nurturing space. Their love is protective, caring, and enduring.

**Virgo: The Devoted Server**
Virgo shows love through consistent acts of service and attention to detail. Their analytical nature helps them work through problems methodically. Their devotion is practical and reliable.

**Finding Balance**
Neither intensity nor stability is inherently better - both have gifts and challenges. Intense signs bring passion and transformation but may struggle with stability. Stable signs offer security and reliability but might need to consciously cultivate spontaneity.

The most successful relationships often blend both energies - the excitement and depth of intensity with the security and consistency of stability. Understanding your natural tendencies helps you appreciate your partner's different way of loving.`,
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400'
    }
  ],
  connection: [
    {
      id: 'chemistry-vs-soul',
      category: 'CONNECTION',
      readTime: '7 min',
      title: 'Sexual Chemistry vs Soul Connection: Understanding the Difference',
      description: 'Some combinations ignite immediate physical passion, while others create deep soul resonance. Understanding both types helps you recognize what you truly need.',
      content: `Some combinations ignite immediate physical passion, while others create deep soul resonance. Understanding both types helps you recognize what you truly need.

**High Sexual Chemistry Combinations**

**Mars-Mars Aspects**
When Mars connects with Mars between charts, physical attraction is instant and powerful. This combination creates competitive energy that translates into passionate physical connection.

**Mars-Venus Contacts**
The classic attraction aspect. Mars (desire) connecting with Venus (love/beauty) creates magnetic physical attraction. The person with Mars pursues the Venus person intensely.

**Mars-Pluto Connections**
This combination creates obsessive, transformative sexual energy. The attraction is intensely powerful, sometimes overwhelming, with themes of power and surrender.

**Sun-Mars Aspects**
The Sun person's vitality activates the Mars person's desire nature. This creates excitement, passion, and strong physical chemistry, though it may include ego conflicts.

**Soul Connection Combinations**

**Moon-Moon Harmony**
When Moons are in compatible signs or connected by harmonious aspects, emotional understanding flows naturally. You "get" each other's feelings without words.

**Sun-Moon Aspects**
The Sun person illuminates the Moon person's emotional nature, while the Moon nourishes the Sun's identity. This creates a sense of emotional completion and recognition.

**Venus-Neptune Contacts**
This aspect creates spiritual, romantic, and compassionate love. The connection feels dreamy, otherworldly, and deeply meaningful. Guard against idealization while honoring the spiritual dimension.

**Saturn-Venus or Saturn-Moon**
Though challenging, Saturn aspects create lasting bonds. Saturn brings commitment, maturity, and endurance to the relationship. These connections deepen with time.

**North Node Connections**
When personal planets contact the North Node, there's a sense of destiny and purpose. These relationships catalyze growth and feel karmically significant.

**Integrating Both**
The ideal relationship combines both sexual chemistry and soul connection. Chemistry creates the initial spark and maintains passion, while soul connection provides depth, meaning, and lasting bond.

Physical attraction without soul connection may burn out quickly. Soul connection without chemistry might feel more like friendship. Recognizing both helps you understand what's present and what might need cultivation.

Sometimes chemistry develops as soul connection deepens. Other times, strong chemistry reveals soul themes through the intensity it creates. Trust your experience while maintaining awareness of both dimensions.`,
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400'
    },
    {
      id: 'identify-soulmate-chart',
      category: 'CONNECTION',
      readTime: '8 min',
      title: 'How to Identify a Soulmate Through Your Birth Chart',
      description: 'Your birth chart contains clues about your soulmate - their energy, qualities, and even timing. Learning to read these indicators helps you recognize them when they appear.',
      content: `Your birth chart contains clues about your soulmate - their energy, qualities, and even timing. Learning to read these indicators helps you recognize them when they appear.

**The 7th House: Partnership Portal**
The sign on your 7th house cusp (Descendant) often describes your soulmate's qualities. Planets in the 7th house reveal relationship themes and what you'll experience through partnership.

**The Ruler of Your 7th House**
Look at which planet rules your Descendant sign, and where it's placed in your chart. This shows where and how you'll meet significant partners, and what areas of life partnership will activate.

**Venus: Love Blueprint**
Venus's sign, house, and aspects reveal what you need in love and the type of person who fulfills you. Venus in aspect to outer planets (Jupiter, Saturn, Uranus, Neptune, Pluto) indicates karmic or significant love connections.

**The North Node: Soul Purpose**
Your North Node, especially if in relationship houses (5th, 7th, 8th), indicates that partnership is part of your soul's purpose. Soulmates help you move toward your North Node.

**Juno: The Marriage Asteroid**
Juno reveals what you need in a committed partnership. Its sign, house, and aspects indicate the qualities of your ideal long-term partner and marriage themes.

**Vertex: Point of Fate**
The Vertex represents fated encounters. When someone's planets, especially personal planets (Sun, Moon, Venus, Mars), contact your Vertex, the meeting feels destined.

**Timing Indicators**

**Progressed Venus or Mars Aspects**
When your progressed Venus or Mars makes significant aspects, especially to your natal Venus, Mars, Sun, or Moon, important relationships often begin.

**Jupiter Transits to Venus or the 7th House**
Jupiter expands whatever it touches. Jupiter transiting Venus or your 7th house often brings significant romantic opportunities and the potential for meeting a soulmate.

**Saturn Return and Opposition**
These major Saturn cycles (around ages 29-30 and 44-45) often coincide with significant relationship events - meetings, commitments, or transformative endings that lead to soulmate connections.

**Composite Chart Recognition**
When you meet a potential soulmate, looking at your composite chart (the midpoint chart between you) reveals the relationship's purpose. A strong, harmonious composite with emphasis on relationship houses suggests a significant soul connection.

**Trust the Recognition**
Beyond astrology, soulmate recognition often includes these signs: immediate familiarity, sense of coming home, accelerated intimacy, synchronicities, mutual growth catalyst, and feeling more yourself in their presence.

Your chart shows potentials, not inevitabilities. Free will and consciousness determine how you navigate these connections. Understanding the indicators helps you recognize and honor soulmate connections when they arrive.`,
      image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400'
    },
    {
      id: 'soulmate-types',
      category: 'CONNECTION',
      readTime: '9 min',
      title: 'Soulmate, Twin Flame, and Karmic Relationship: The Differences',
      description: 'Not all significant connections are the same. Understanding the difference between soulmates, twin flames, and karmic relationships helps you navigate each with appropriate awareness.',
      content: `Not all significant connections are the same. Understanding the difference between soulmates, twin flames, and karmic relationships helps you navigate each with appropriate awareness.

**Soulmate Relationships**

**What They Are**
Soulmates are souls we've known across lifetimes who come together for mutual growth, love, and support. You can have multiple soulmates - romantic partners, friends, family members, or teachers.

**How They Feel**
Soulmate connections feel comfortable, familiar, and right. There's immediate recognition, deep understanding, and natural harmony. While challenges exist, there's an underlying sense of ease and belonging.

**Purpose**
Soulmates support your growth through love, companionship, and shared experiences. They help you become more of who you truly are. These relationships can last a lifetime or serve a specific chapter of growth.

**Astrological Indicators**
Harmonious Sun-Moon aspects, Venus-Jupiter connections, strong 7th house emphasis, compatible elements, and flowing outer planet aspects characterize soulmate connections.

**Twin Flame Relationships**

**What They Are**
Twin flames are believed to be two halves of one soul split into two bodies. This is your ultimate mirror - not necessarily romantic, and extremely rare. Most people may never meet their twin flame in a given lifetime.

**How They Feel**
Twin flame connections are intensely magnetic yet often turbulent. There's instant, overwhelming recognition and attraction, but also intense triggers and mirrors. The relationship challenges everything you thought you knew about yourself.

**Purpose**
Twin flames catalyze profound spiritual awakening and transformation. The relationship isn't primarily about romantic fulfillment but about triggering your deepest wounds and greatest healing. Often, periods of separation are necessary for individual growth.

**Astrological Indicators**
Intense Pluto aspects, nodal connections, matching or mirroring chart patterns, challenging aspects that create growth through friction, and composite charts with strong transformation themes.

**Karmic Relationships**

**What They Are**
Karmic relationships are connections that come to resolve past-life karma, complete unfinished business, or learn specific lessons. They feel fated and can be with anyone - lovers, family, friends, or even difficult people who teach you boundaries.

**How They Feel**
Karmic relationships often feel compulsive, destined, or impossible to walk away from, even when unhealthy. There's a sense of "having to" work through something. They may feel both familiar and uncomfortable.

**Purpose**
These relationships come to teach specific lessons - often about boundaries, self-worth, releasing patterns, or completing old cycles. Once the lesson is learned, these relationships often naturally end or transform.

**Astrological Indicators**
Saturn aspects between charts, South Node connections, Pluto-Saturn contacts, 12th house placements, and challenging aspects that require work and maturity.

**Navigating Each Type**

**With Soulmates**
Embrace the love, allow the support, communicate openly, and grow together. Don't take the harmony for granted - nurture the connection.

**With Twin Flames**
Focus on your own healing and growth, especially during separation periods. Don't chase or try to force union. Trust divine timing and do your inner work.

**With Karmic Partners**
Identify the lesson, learn it consciously, and release the relationship with gratitude when complete. Don't stay longer than the lesson requires.

**The Most Important Understanding**
All connections serve your soul's evolution. Not every significant relationship is meant to last forever. The highest love sometimes means releasing what doesn't serve your highest good, honoring what each connection taught you, and moving forward with wisdom and an open heart.`,
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400'
    }
  ],
  mystical: [
    {
      id: 'numerology-love',
      category: 'MYSTICAL',
      readTime: '7 min',
      title: 'Astrology Meets Numerology: When Numbers Confirm Destiny',
      description: 'When both astrology and numerology point to the same person, the connection is undeniable. Learn how to read both systems together for deeper insight into love destiny.',
      content: `When both astrology and numerology point to the same person, the connection is undeniable. Learn how to read both systems together for deeper insight into love destiny.

**Life Path Numbers and Sun Signs**
Your Life Path number (calculated from your birth date) carries similar energy to your Sun sign. Both reveal your core essence and life purpose. When Life Path numbers and Sun signs complement each other between two people, it indicates fundamental compatibility.

**Compatible Life Path Combinations**
Life Paths 1, 5, and 7 (independence seekers) often harmonize.
Life Paths 2, 4, and 8 (builders and nurturers) complement each other.
Life Paths 3, 6, and 9 (creative and humanitarian) create inspiring connections.

**Master Numbers: 11, 22, 33**
If either person has a Master Number Life Path, the relationship carries spiritual significance and higher purpose. These connections often feel destined and involve teaching, healing, or service together.

**Destiny Number and Venus Sign**
Your Destiny Number (from your full birth name) describes your soul's purpose, similar to Venus in your chart describing how you love. When someone's Destiny Number aligns with your Venus sign's qualities, they naturally support your love expression.

**Soul Urge Number and Moon Sign**
The Soul Urge (from vowels in your name) reveals inner desires, like your Moon sign reveals emotional needs. Compatibility here indicates deep emotional and spiritual understanding.

**Personal Year Numbers and Transits**
Your Personal Year number (birth day + month + current year) shows the energy of your current phase, similar to astrological transits. Meeting someone significant often occurs during Personal Year 5 (change), 6 (love), or 9 (completion/new beginning).

**Confirming Connections Through Both Systems**

**When Astrology and Numerology Agree**
If both your synastry (astrological compatibility) and numerology show harmony, the connection is deeply aligned across multiple dimensions. This suggests a soul-level match.

**When They Show Different Things**
Sometimes astrology indicates challenges while numerology shows harmony, or vice versa. This reveals different levels of the relationship - perhaps karmic lessons (astrology) within a destined connection (numerology).

**Name Changes and Relationship Timing**
Significant name changes (marriage, adoption) create new numerological vibrations. This can shift relationship dynamics and timing, similar to how progressed charts evolve astrologically.

**Address and Location Numbers**
The numerology of where you live (address number) and where you meet someone can indicate destined timing. Certain locations vibrate with certain numbers, attracting specific experiences and people.

**Anniversary Dates and Compatibility**
The numerology of your meeting date, first date, or anniversary reveals the relationship's underlying vibration. Dates that reduce to 2 (partnership), 6 (love), or 9 (divine love) carry special significance.

**Using Both Systems Together**
Start with astrology for timing and compatibility patterns.
Use numerology to confirm and add another layer of understanding.
Notice where both systems agree - these are your strongest indicators.
Where they differ, explore what each system is showing about different aspects of the connection.

When multiple systems point toward the same person or relationship, it's the universe speaking through different languages. Trust these confirmations while still honoring your free will and discernment.`,
      image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400'
    },
    {
      id: 'astrology-tarot-love',
      category: 'MYSTICAL',
      readTime: '8 min',
      title: 'Combining Astrology and Tarot for Soul Connection Insights',
      description: 'Astrology provides the cosmic blueprint while Tarot reveals the spiritual story. Together, they offer profound understanding of your love connections and soul bonds.',
      content: `Astrology provides the cosmic blueprint while Tarot reveals the spiritual story. Together, they offer profound understanding of your love connections and soul bonds.

**Zodiac Signs and Tarot Correspondences**

**Fire Signs and Tarot**
Aries = Emperor: Leadership, action, initiation
Leo = Strength: Courage, passion, heart-centered power
Sagittarius = Temperance: Philosophy, higher wisdom, balance

**Earth Signs and Tarot**
Taurus = Hierophant: Values, tradition, material security
Virgo = Hermit: Analysis, service, inner wisdom
Capricorn = Devil: Mastery over material, ambition, shadow work

**Air Signs and Tarot**
Gemini = Lovers: Choices, duality, communication
Libra = Justice: Balance, fairness, relationship karma
Aquarius = Star: Hope, innovation, collective consciousness

**Water Signs and Tarot**
Cancer = Chariot: Emotional courage, home, protection
Scorpio = Death: Transformation, depth, rebirth
Pisces = Moon: Intuition, dreams, spiritual connection

**Planets and Major Arcana**
Sun = Sun card: Joy, vitality, true self
Moon = High Priestess: Intuition, mystery, inner knowing
Mercury = Magician: Communication, mental connection
Venus = Empress: Love, beauty, sensuality, abundance
Mars = Tower: Action, breakthrough, necessary destruction
Jupiter = Wheel of Fortune: Expansion, luck, cycles
Saturn = World: Completion, mastery, commitment
Uranus = Fool: Freedom, innovation, new beginnings
Neptune = Hanged Man: Surrender, spiritual insight, sacrifice
Pluto = Judgment: Transformation, rebirth, soul calling

**Reading for Relationship Insights**

**The Synastry Spread**
Layout cards to represent each person's Sun, Moon, Venus, and Mars energies. The center card reveals the relationship's soul purpose. This spread combines astrological points with Tarot's narrative wisdom.

**The Nodal Axis Reading**
Draw cards for North Node (where you're going) and South Node (where you've been) for both partners. This reveals the karmic journey and growth direction of your connection.

**The Houses of Love Spread**
Draw cards for the 5th house (romance), 7th house (partnership), and 8th house (intimacy/transformation) in your relationship. This shows how love expresses across different areas.

**Timing Love with Tarot and Astrology**
When asking about timing, combine your current astrological transits with Tarot. Aces indicate new beginnings (matching Jupiter or Uranus transits). Court cards might represent actual people appearing during specific planetary periods.

**The Elemental Balance Check**
Count the elements in your Tarot spread (Wands=Fire, Cups=Water, Swords=Air, Pentacles=Earth) and compare to the elements in your synastry chart. Imbalances in both systems indicate areas needing attention.

**Understanding Through Multiple Lenses**

**When Astrology Shows Challenge**
If synastry shows difficult aspects, Tarot can reveal the spiritual purpose of these challenges and guidance for working through them. Pull cards asking "What is this teaching us?" or "How can we grow through this?"

**When Tarot Shows Warning**
If cards like Tower, Ten of Swords, or difficult combinations appear, check your astrological transits. Often, challenging cards reflect temporary transits rather than permanent conditions.

**Confirmation Through Symbols**
When the same themes appear in both astrology and Tarot, pay close attention. For example, strong Plutonian aspects in synastry combined with Death or Tower cards confirms deep transformation is the relationship's purpose.

**The Lovers Card and Venus**
When The Lovers appears in readings about someone, check their Venus sign and aspects. This card combined with harmonious Venus synastry is a powerful indicator of soul-level romantic connection.

**Creating a Love Destiny Reading**
1. Look at your natal Venus and 7th house
2. Pull cards asking about your ideal partner's qualities
3. Check if the cards' themes match your astrological indicators
4. Pull cards for timing, asking when this connection will manifest
5. Compare Tarot timing to your upcoming Jupiter and Saturn transits

**Working With Both Systems**
Use astrology for the "what" and "when" - the cosmic patterns and timing.
Use Tarot for the "how" and "why" - the spiritual story and guidance.
Let each system inform the other, creating a fuller picture.
Trust when both point in the same direction - the universe is speaking clearly.

Remember, both astrology and Tarot are tools for awareness, not deterministic predictions. They reveal potentials and guidance while your free will and choices ultimately shape your love destiny.`,
      image: 'https://images.unsplash.com/photo-1551431009-a802eeec77b1?w=400'
    }
  ]
};

const topicFilters = [
  { key: 'all', label: 'All' },
  { key: 'astrology', label: 'Astrology' },
  { key: 'connection', label: 'Connection' },
  { key: 'mystical', label: 'Mystical' }
];

export default function ContentArchive({ contentId }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedContent, setSelectedContent] = useState(null);

  // If we have a specific content ID, show that content
  React.useEffect(() => {
    if (contentId) {
      // Find the content across all categories
      for (const [category, articles] of Object.entries(contentData)) {
        const article = articles.find(a => a.id === contentId);
        if (article) {
          setSelectedContent(article);
          break;
        }
      }
    }
  }, [contentId]);

  // If showing specific content
  if (selectedContent) {
    return <ContentDetail content={selectedContent} />;
  }

  // Get filtered content
  const getFilteredContent = () => {
    if (activeFilter === 'all') {
      return Object.values(contentData).flat();
    }
    return contentData[activeFilter] || [];
  };

  const filteredContent = getFilteredContent();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--background-start)] to-[var(--background-end)]">
      <div className="px-4 pt-8 pb-8">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Topics Header */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Topics</h1>
            
            {/* Filter Tabs */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-800/50 flex-shrink-0">
                <Bookmark className="w-4 h-4 text-gray-400" />
              </button>
              {topicFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex-shrink-0 ${
                    activeFilter === filter.key
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {filteredContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => {
                  // Navigate to the specific content
                  window.history.pushState({}, '', `${createPageUrl('guides')}?id=${content.id}`);
                  setSelectedContent(content);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}