import React from 'react';

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6 md:p-12 text-white">
      <div className="max-w-4xl mx-auto bg-opacity-10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
        <header className="bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 py-6 px-8 shadow-lg rounded-t-lg">
          <h1 className="text-4xl font-extrabold text-white">ClipSync Documentation</h1>
          <p className="text-sm mt-2 text-gray-300">Your guide to using ClipSync effectively for video recording and Broadcasting</p>
        </header>
        <div className="p-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold border-b-2 border-purple-600 pb-2 mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {["Getting Started", "Creating Workspaces", "Adding Team Members", "Recording Videos", "Sharing Video Links", "Downloading the Desktop Plugin", "Selecting Resolution", "Plans and Pricing"].map((item) => (
                <li key={item} className="text-lg hover:text-purple-400 cursor-pointer transition duration-300">{item}</li>
              ))}
            </ul>
          </section>
          {[
            {
              title: "Getting Started",
              content: [
                { step: "Sign Up", text: "To get started with ClipSync, visit the site and sign up using your email or Google account." },
                { step: "Login", text: "Once registered, log in to access all features and start creating and sharing videos." },
              ],
            },
            {
              title: "Creating Workspaces",
              content: [
                { step: "Navigate to Workspaces", text: "Go to the Workspace section and select 'Workspaces'." },
                { step: "Create a New Workspace", text: "Click 'Create Workspace' and enter the name and description, then set visibility options." },
                { step: "Organize Folders", text: "Add folders to categorize content within workspaces." },
                { step: "Edit or Delete", text: "Manage settings for each workspace as needed." },
              ],
            },
            {
              title: "Adding Team Members",
              content: [
                { step: "Invite Team Members", text: "Select 'Invite Members' and enter their email addresses." },
                { step: "Manage Invitations", text: "Track pending invitations in the Team Members section." },
                { step: "Edit Member Permissions", text: "Adjust roles or remove members as needed." },
              ],
            },
          ].map((section, index) => (
            <div key={index} className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-md shadow-md">
              <h3 className="text-xl font-semibold text-purple-400 mb-2">{section.title}</h3>
              <ol className="list-decimal list-inside space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="pl-2">
                    <span className="font-bold">{item.step}: </span>
                    {item.text}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          <section className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Sharing Video Links</h3>
            <p className="mb-2">Easily share videos with your team and clients:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Generate a Shareable Link and choose View-Only or Edit permissions.</li>
              <li>Embed or Copy Link to share via email or other platforms.</li>
              <li>Share with Team Members by selecting "Notify Team Members".</li>
            </ol>
          </section>

          <section className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Downloading the Desktop Plugin</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Download Plugin from the Settings page for Windows, Mac, or Linux.</li>
              <li>Install Plugin and follow the on-screen instructions.</li>
              <li>Log In on Desktop to access ClipSync’s features directly from your computer.</li>
            </ol>
          </section>

          <section className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Selecting Resolution</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Adjust Resolution in the recording toolbar for the best quality.</li>
              <li>Resolution Options include 480p, 720p, 1080p, and 4K.</li>
            </ol>
          </section>

          <section className="mb-8 p-4 bg-gray-800 bg-opacity-50 rounded-md shadow-md">
            <h3 className="text-xl font-semibold text-purple-400 mb-2">Plans and Pricing</h3>
            <div className="space-y-2">
              <p><strong>Free Plan:</strong> Limited recording time, basic sharing, and up to 5 team members per workspace.</p>
              <p><strong>Paid Plan:</strong> Extended recording times, advanced sharing, and up to 50 team members.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Docs;
