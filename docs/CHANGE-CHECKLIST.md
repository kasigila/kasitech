# KasiTech Website — Change Checklist (Plain English)

Source audit: [WEBSITE-AUDIT-2026-07.md](./WEBSITE-AUDIT-2026-07.md)  
Nothing below is done yet. These are the recommended fixes.

How to read this:
- **What it means** = simple explanation
- **Why** = why it matters for visitors or the business

---

## P0 — Fix first (broken or trust-breaking)

### Lead form / “Start a Project”

- [ ] **Don’t say “we got your email” if we didn’t**
  - **What it means:** After someone submits the form, the site can say the message was emailed even when nothing was actually sent.
  - **Why:** People think you received their project brief when you might not have.

- [ ] **Show a real backup plan when sending fails**
  - **What it means:** If email fails, clearly tell them to use WhatsApp or email instead.
  - **Why:** So enquiries don’t silently disappear.

- [ ] **Make the server honest about delivery**
  - **What it means:** The backend should not reply “all good” when no email provider is set up.
  - **Why:** Stops fake success messages.

- [ ] **Check form data properly on the server**
  - **What it means:** Don’t trust whatever the browser sends; validate name, email, phone, etc.
  - **Why:** Fewer bad/spam/broken submissions.

### Phone numbers

- [ ] **Accept normal international phone numbers**
  - **What it means:** Right now the form wants exactly 10 digits. That blocks many real numbers (including Tanzania +255).
  - **Why:** Your own market can’t finish the form easily.

- [ ] **Change the form wording to match the new phone rules**
  - **What it means:** Stop telling people “enter a 10-digit number” if that’s no longer the rule.
  - **Why:** Avoids confusing instructions.

### Mobile menu

- [ ] **Let Escape close the mobile menu**
  - **What it means:** Pressing Escape should close the open menu. Right now it stays open.
  - **Why:** Basic expected behavior, especially for keyboard users.

- [ ] **Move keyboard focus into the menu when it opens**
  - **What it means:** When the menu opens, keyboard/screen-reader users should land inside it.
  - **Why:** Otherwise they can’t navigate it properly.

- [ ] **Keep focus trapped in the open menu**
  - **What it means:** Tabbing shouldn’t jump to invisible page content behind the menu.
  - **Why:** Prevents getting “lost” behind the overlay.

- [ ] **Put focus back on “Menu” when closing**
  - **What it means:** After closing, return to the button that opened it.
  - **Why:** Smooth keyboard experience.

- [ ] **Make Menu / Close easier to tap**
  - **What it means:** Those text buttons are too small for fingers.
  - **Why:** Fewer mis-taps on phones.

- [ ] **Make social icons easier to tap**
  - **What it means:** Tiny LinkedIn/Instagram/WhatsApp icons need bigger tap areas.
  - **Why:** Same reason — phone usability.

### Sharing / Google / website address

- [ ] **Add a proper preview image for WhatsApp/LinkedIn/Twitter shares**
  - **What it means:** When someone shares your site, there’s no big preview image set up.
  - **Why:** Shares look unfinished or blank.

- [ ] **Give each important page its own share title/description**
  - **What it means:** Work/Company/Start pages currently reuse the homepage share text.
  - **Why:** Shared links should match the page people are looking at.

- [ ] **Pick one official website address (www or non-www) everywhere**
  - **What it means:** The live site uses `www`, but some SEO settings still use the non-www version.
  - **Why:** Confuses search engines and can split ranking signals.

- [ ] **Add proper page info for the Zuri demo**
  - **What it means:** `/demo/zuri` has no special title/description; it looks like the homepage to Google.
  - **Why:** Every major page should describe itself correctly.

### Hard-to-read text (accessibility)

- [ ] **Darken light-gray text on cream backgrounds**
  - **What it means:** Some gray text on ivory sections is too faint to read comfortably.
  - **Why:** Accessibility requirement and premium polish.

- [ ] **Brighten dim inactive labels on black backgrounds**
  - **What it means:** Some “unselected” pathway titles are too dark/gray to read.
  - **Why:** Same — readability.

- [ ] **Fix low-contrast text inside demos (like Zuri)**
  - **What it means:** Some muted demo labels fail contrast checks.
  - **Why:** Demos should still be readable.

### Trust / how people contact you

- [ ] **Move off the personal iCloud email for public contact**
  - **What it means:** The site shows `karen_marie1@icloud.com`. That feels personal, not company.
  - **Why:** Premium buyers expect a company email.

- [ ] **Make it obvious which number to use**
  - **What it means:** There’s a US WhatsApp and a Tanzania mobile. People get confused.
  - **Why:** Fewer abandoned contacts.

- [ ] **Store contact details in one place in the code**
  - **What it means:** Phone/email are copied in several files and can drift apart.
  - **Why:** One change updates the whole site.

- [ ] **Fix the BYZ “live site” link**
  - **What it means:** One “real client” project points to a GitHub Pages mock URL.
  - **Why:** Looks like a student demo, not shipped client work.

- [ ] **Clean up the Climate Finance live URL if needed**
  - **What it means:** The link ends in `/index.html`, which can look unfinished.
  - **Why:** Small credibility detail.

- [ ] **Be careful with “EST. 2026”**
  - **What it means:** Showing the company was founded in 2026 can make it feel brand-new unless proof is strong nearby.
  - **Why:** First impression of maturity.

---

## P1 — Big improvements next

### First seconds on the homepage

- [ ] **Don’t block the homepage with the long “Kasi / KasiTech” intro**
  - **What it means:** First-time visitors wait ~3–4 seconds before they can read or click.
  - **Why:** Delays the sale. Shorten it or don’t cover the page.

### Homepage selling better

- [ ] **Make the main headline more specific**
  - **What it means:** “We build digital products that work” is clear but generic. Say who it’s for and what outcome they get.
  - **Why:** Visitors decide faster.

- [ ] **Show proof near the top**
  - **What it means:** Put real shipped work / credibility near the first screen, not only demos.
  - **Why:** Trust comes before “try a demo.”

- [ ] **Load the hero demo carousel only once**
  - **What it means:** The code currently mounts that carousel twice (desktop + mobile).
  - **Why:** Wasteful and can cause weird performance/behavior.

- [ ] **Stop auto-flipping shipped work so fast**
  - **What it means:** Real project cards rotate by themselves.
  - **Why:** Harder to read; feels restless.

- [ ] **Add “Start a similar project” on real work cards**
  - **What it means:** After showing shipped work, give a direct next step.
  - **Why:** Turns proof into leads.

- [ ] **Link shipped work to your own case study pages**
  - **What it means:** Don’t only send people to external sites; send them to `/work/...` pages you control.
  - **Why:** Keeps them in your funnel.

- [ ] **Don’t push “try demos” harder than “start a project”**
  - **What it means:** Too many paths into demos before asking for the project.
  - **Why:** People explore forever and never enquire.

- [ ] **Make the homepage shorter on phones**
  - **What it means:** Mobile home can take ~9–15 screens of scrolling.
  - **Why:** People leave before the important parts.

- [ ] **Make carousel dots easy to tap**
  - **What it means:** The little dots are tiny (about 6px).
  - **Why:** Basically untappable on mobile.

- [ ] **Add a pause button for auto-rotating demos**
  - **What it means:** Let people stop the slideshow.
  - **Why:** Accessibility and control.

- [ ] **Make “Website / Booking / Shop…” look like buttons**
  - **What it means:** Those intent links look like plain underlined text.
  - **Why:** People miss them or struggle to tap them.

### Work / portfolio pages

- [ ] **Put real client work first, concepts second**
  - **What it means:** Make “shipped” louder than “concept demos.”
  - **Why:** Buyers care most about real results.

- [ ] **Shorten the Work page hero**
  - **What it means:** Big headline eats the whole first screen before any projects appear.
  - **Why:** Too much scrolling to see the work.

- [ ] **Fix the Work filters for accessibility**
  - **What it means:** Filters look like tabs but don’t behave fully like tabs.
  - **Why:** Screen-reader/keyboard users get a broken pattern.

- [ ] **Name image links for screen readers**
  - **What it means:** Some clickable project images have empty alt text and no link name.
  - **Why:** Blind users hear “link” with no meaning.

- [ ] **Add missing page descriptions**
  - **What it means:** Pages like All Work / FAQ / Lab / Privacy / Terms lack good meta descriptions.
  - **Why:** Better Google snippets.

### Case study pages

- [ ] **Don’t make the whole case study a heavy client-side page**
  - **What it means:** One small accordion currently forces a lot of the page to load as interactive JS.
  - **Why:** Slower and harder to maintain.

- [ ] **Hide long “thinking” sections behind expand/collapse**
  - **What it means:** Don’t dump every paragraph at once.
  - **Why:** Less wall-of-text feeling.

- [ ] **Add share images for each case study**
  - **What it means:** Each project should have its own preview image when shared.
  - **Why:** Looks professional in chats/social.

### Company / About / Founder

- [ ] **Redirect /about to /company**
  - **What it means:** `/about` is an old leftover page. `/company` is the real story.
  - **Why:** Stops duplicate/confusing “about us” pages.

- [ ] **On Company, make “Start a project” the main button**
  - **What it means:** The big green button currently pushes “Explore our work.”
  - **Why:** Exploration is secondary; enquiries are primary.

- [ ] **Shorten Company and Founder pages**
  - **What it means:** They’re long and overlapping with homepage messaging.
  - **Why:** Respect attention; keep the story tight.

### Capabilities

- [ ] **Make Attract/Transact/Operate/Decide easy to tap on phones**
  - **What it means:** Those four links are small and cramped on one row.
  - **Why:** Hard to hit accurately.

- [ ] **Explain each capability in simpler buyer language**
  - **What it means:** Less abstract “compositions” talk; more “what you get.”
  - **Why:** Faster understanding.

### Motion / accessibility

- [ ] **Respect “reduce motion” settings**
  - **What it means:** If someone asks their device to reduce animation, stop auto-rotating carousels.
  - **Why:** Accessibility law/best practice; also comfort.

### Analytics

- [ ] **Actually collect the tracking events**
  - **What it means:** The site fires custom events, but nothing listens/saves them.
  - **Why:** You’re flying blind on what converts.

### Start form usability

- [ ] **Connect error messages to the fields**
  - **What it means:** Screen readers should hear which field failed and why.
  - **Why:** Accessibility.

- [ ] **Keep a visible focus outline on form fields**
  - **What it means:** Don’t remove the focus ring without a clear replacement.
  - **Why:** Keyboard users need to see where they are.

- [ ] **Don’t force WhatsApp redirect without choice**
  - **What it means:** After submit, users may get yanked into WhatsApp automatically.
  - **Why:** Surprising; some people prefer email only.

- [ ] **Tell people what happens after they submit**
  - **What it means:** Reassure: reply timing, next steps, what you’ll ask.
  - **Why:** Lowers form anxiety.

### Cleanup

- [ ] **Delete old unused homepage sections still in the code**
  - **What it means:** About 11 home components aren’t used anymore but still sit in the repo.
  - **Why:** Less clutter for future work.

- [ ] **Fix lint errors**
  - **What it means:** The code quality checker currently fails on several files.
  - **Why:** Keeps the project healthy.

- [ ] **Either fill out Lab or hide it**
  - **What it means:** `/lab` is thin. Don’t promote an empty room.
  - **Why:** Empty pages hurt premium feel.

- [ ] **Make FAQ easier to scan on mobile**
  - **What it means:** Add jump links or accordions.
  - **Why:** Faster answers.

- [ ] **In Privacy, link the contact methods you mention**
  - **What it means:** Don’t say “contact us on WhatsApp/email” without clickable links.
  - **Why:** Basic usability.

---

## P2 — Polish (make it feel sharper)

- [ ] **Keep the green “Start a Project” button visible while scrolling**
  - **What it means:** The header hides on scroll and takes the CTA with it.
  - **Why:** People lose the next action.

- [ ] **Simplify the top menu**
  - **What it means:** Maybe put Founder under Company; don’t overcrowd primary nav.
  - **Why:** Cleaner choices.

- [ ] **Use lighter animation tech for simple fades**
  - **What it means:** Don’t need a heavy animation library for basic fade-ins.
  - **Why:** Faster pages.

- [ ] **Load less “interactive” JavaScript on mostly-static pages**
  - **What it means:** Some text-heavy pages are marked as client apps unnecessarily.
  - **Why:** Better performance.

- [ ] **Check font file sizes**
  - **What it means:** Three font families may be more than needed.
  - **Why:** Slightly faster loads.

- [ ] **Keep dependencies updated for security**
  - **What it means:** npm reports some high-severity issues via Next packages.
  - **Why:** Safety/maintenance.

- [ ] **Pause buttons on other auto-rotating sections too**
  - **What it means:** Capability and shipped sections also rotate.
  - **Why:** User control.

- [ ] **Make demo overlays keyboard-friendly**
  - **What it means:** Popup/about panels in demos need Escape/focus handling.
  - **Why:** Accessibility.

- [ ] **Keep visual style consistent (sharp vs rounded)**
  - **What it means:** Most of the site is sharp-cornered; the card page uses a rounder button.
  - **Why:** Small brand consistency.

- [ ] **Hide decorative dots from screen readers**
  - **What it means:** Fake browser window dots shouldn’t be announced.
  - **Why:** Less noise for assistive tech.

- [ ] **Stronger “this is a KasiTech demo” bar on mobile**
  - **What it means:** People can forget they’re in a concept demo and think they left your site.
  - **Why:** Orientation + conversion.

- [ ] **Host important demo photos yourself**
  - **What it means:** Some demos load big Unsplash images from the internet.
  - **Why:** Faster, more reliable first paint.

- [ ] **Split giant demo apps into smaller pieces**
  - **What it means:** Huge demos like Zuri load a lot at once.
  - **Why:** Quicker demo startup.

- [ ] **Stop changing every sitemap date on every build**
  - **What it means:** Sitemap pretends every page updated today each deploy.
  - **Why:** Weak/noisy SEO signal.

- [ ] **Repeat marketing phrases less**
  - **What it means:** “Products that work” / “what do you want to build” appear too often.
  - **Why:** Feels repetitive.

- [ ] **Add a simple process section**
  - **What it means:** Explain steps: discover → design → build → launch → support.
  - **Why:** Reduces “how does working with you work?” anxiety.

- [ ] **Repeat the “we reply in 24 hours” promise near CTAs**
  - **What it means:** That reassurance already exists in places; make it more visible.
  - **Why:** Helps people click Start.

- [ ] **Test “Save to Contacts” on real phones**
  - **What it means:** Make sure the digital card actually saves on iPhone/Android.
  - **Why:** That page’s whole job.

---

## P3 — Later (nice when ready)

- [ ] **Add real client quotes**
  - **What it means:** Testimonials from people who hired you.
  - **Why:** Strongest trust booster.

- [ ] **Add logos of clients/orgs (with permission)**
  - **What it means:** A simple logo row.
  - **Why:** Instant credibility.

- [ ] **Add numbers to case studies**
  - **What it means:** “Built in 3 weeks,” “more enquiries,” etc. — real metrics.
  - **Why:** Proof beyond pretty screenshots.

- [ ] **Make Lab a real thing or remove it from menus**
  - **What it means:** Don’t advertise R&D if there’s nothing to show.
  - **Why:** Avoid empty promises.

- [ ] **Consider Swahili / bilingual later**
  - **What it means:** Local-language support if East Africa growth needs it.
  - **Why:** Market reach.

- [ ] **Add a simple CMS later**
  - **What it means:** Easier editing of case studies/FAQs without code.
  - **Why:** Faster content updates.

- [ ] **Optional pricing page**
  - **What it means:** Only if you productize packages.
  - **Why:** Filters unserious leads.

- [ ] **Optional calendar booking**
  - **What it means:** Some buyers won’t use WhatsApp; let them book a call.
  - **Why:** Institutional/corporate comfort.

- [ ] **Breadcrumbs on deep pages**
  - **What it means:** “Home > Work > Zuri” style path.
  - **Why:** Easier orientation after demos.

---

## Do not throw away

These are already good — keep them:

- The black / ivory / lime look
- The bold typography
- The interactive demos (just label concepts vs real work clearly)
- The conversational Start form idea
- The honest FAQ about demos vs real clients
- The digital business card page
- The basic focus outline and reduce-motion CSS already in the site

---

## Simple order to do the work

1. [ ] Make the form tell the truth + accept real phone numbers
2. [ ] Fix mobile menu keyboard/tap issues
3. [ ] Fix share images + www address consistency + hard-to-read text
4. [ ] Clean up contact/trust details (email, phones, BYZ link)
5. [ ] Shorten homepage intro + put real proof higher
6. [ ] Fix Work page priorities + redirect old About page
7. [ ] Accessibility/motion/analytics/form polish
8. [ ] Delete dead code + fix lint
9. [ ] Visual/performance polish
10. [ ] Testimonials/metrics/Lab/etc. when you have the assets
