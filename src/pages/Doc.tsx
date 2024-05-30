import React from "react";
import Navbar from "@/components/Other/Navbar";
import Footer from "@/components/Other/FooterComp";

const DocumentationPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100">
        <div className="container mx-auto bg-white shadow-md rounded-lg md:p-8 p-4">
          <h1 className="text-3xl font-bold mb-6">Xendpal CLI</h1>
          <p className="text-lg mb-6">
            Xendpal CLI is a command-line interface to interact with Xendpal,
            your go-to static file database. It allows you to easily upload
            files, create folders, list items, delete files, and download files
            directly from your terminal.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside mb-6">
            <li>Upload files to Xendpal</li>
            <li>Create folders in Xendpal</li>
            <li>List all items (files and folders) in your Xendpal account</li>
            <li>Delete specific files or folders</li>
            <li>Download files from Xendpal</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Installation</h2>
          <p>Move the Binary to a Preferred Location (optional)</p>
          <div className="bg-gray-800 text-white p-4 rounded my-6">
            <pre>
              <code>
                mkdir -p ~/xendpalcli mv ~/Downloads/xendpalcli-linux
                ~/xendpalcli/xendpalcli
              </code>
            </pre>
          </div>

          <p>Make the Binary Executable</p>
          <div className="bg-gray-800 text-white p-4 rounded mb-6">
            <pre>
              <code>chmod +x ~/xendpalcli/xendpalcli</code>
            </pre>
          </div>

          <p>Adding the Binary to the System PATH</p>
          <div className="bg-gray-800 text-white p-4 rounded mb-6">
            <pre>
              <code>nano ~/.bashrc</code>
            </pre>
            <pre>
              <code>export PATH="$HOME/xendpalcli:$PATH"</code>
            </pre>
            <pre>
              <code>source ~/.bashrc</code>{" "}
            </pre>
          </div>

          <p className="mb-6">Verify installation</p>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`
 xendpalcli --help
`}
            </code>
          </pre>
          <h2 className="text-2xl font-semibold mb-4">Usage</h2>
          <h3 className="text-xl font-semibold mb-2">Authentication</h3>
          <p className="mb-6">
            All commands require an API token for authentication. Pass the token
            using the <code className="bg-gray-200 p-1 rounded">--token</code>{" "}
            flag.
          </p>

          <h3 className="text-xl font-semibold mb-2">Commands</h3>
          <h4 className="text-lg font-semibold mb-2">Upload a File</h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli --token YOUR_API_TOKEN upload /path/to/your/file.jpg`}
            </code>
          </pre>

          <h4 className="text-lg font-semibold mb-2">Create a Folder</h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli --token YOUR_API_TOKEN create_folder "New Folder"`}
            </code>
          </pre>

          <h4 className="text-lg font-semibold mb-2">List All Items</h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>{`xendpalcli --token YOUR_API_TOKEN list_all`}</code>
          </pre>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli --token YOUR_API_TOKEN list_all --output items.json`}
            </code>
          </pre>

          <h4 className="text-lg font-semibold mb-2">
            Fetch Files in a Folder
          </h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli --token YOUR_API_TOKEN fetch_files FOLDER_ID`}
            </code>
          </pre>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli --token YOUR_API_TOKEN fetch_files FOLDER_ID --output files.json`}
            </code>
          </pre>

          <h4 className="text-lg font-semibold mb-2">
            Delete a File or Folder
          </h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`# Delete a file
xendpalcli --token YOUR_API_TOKEN delete_item FILE_ID

# Delete a folder
xendpalcli --token YOUR_API_TOKEN delete_item --folder FOLDER_ID`}
            </code>
          </pre>

          <h4 className="text-lg font-semibold mb-2">Download a File</h4>
          <pre className="bg-gray-800 text-white p-4 rounded mb-6">
            <code>
              {`xendpalcli download_file "http://cdn.xendpal.cloud/12-11-20230801_230429.jpg" "/path/to/save/"`}
            </code>
          </pre>

          <h2 className="text-2xl font-semibold mb-4">
            Built for Different Platforms
          </h2>

          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/xendpalcli.exe"
              download={"xendpalcli.exe"}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download for Windows
            </a>
            <a
              href="/xendpalcli"
              download={"xendpalcli"}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Download for Linux
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DocumentationPage;
