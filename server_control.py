#!/usr/bin/env python3
"""
Desktop application to start and stop the web server.
"""

import tkinter as tk
from tkinter import messagebox
import subprocess
import os
import signal

class ServerControlApp:
    def __init__(self, master):
        self.master = master
        master.title("Web Server Control")
        master.geometry("300x150")
        
        # Variable to hold the server process
        self.server_process = None
        
        # Create GUI elements
        self.label = tk.Label(master, text="Control the web server", pady=10)
        self.label.pack()
        
        self.start_button = tk.Button(master, text="Start Server", 
                                      command=self.start_server, bg="green", fg="white",
                                      width=15, height=2)
        self.start_button.pack(pady=5)
        
        self.stop_button = tk.Button(master, text="Stop Server", 
                                     command=self.stop_server, bg="red", fg="white",
                                     width=15, height=2, state=tk.DISABLED)
        self.stop_button.pack(pady=5)
        
        # Handle window close
        master.protocol("WM_DELETE_WINDOW", self.on_closing)
    
    def start_server(self):
        """Start the web server in a subprocess."""
        if self.server_process is None or self.server_process.poll() is not None:
            try:
                # Change to the directory containing server.py
                script_dir = os.path.dirname(os.path.abspath(__file__))
                self.server_process = subprocess.Popen(
                    ["python3", "server.py"],
                    cwd=script_dir,
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE
                )
                # Update GUI
                self.start_button.config(state=tk.DISABLED)
                self.stop_button.config(state=tk.NORMAL)
                self.label.config(text="Server is running on http://localhost:8000")
                # Check if process started successfully (optional)
                # We'll just assume it did for simplicity
            except Exception as e:
                messagebox.showerror("Error", f"Failed to start server: {str(e)}")
        else:
            messagebox.showinfo("Info", "Server is already running.")
    
    def stop_server(self):
        """Stop the web server subprocess."""
        if self.server_process is not None and self.server_process.poll() is None:
            try:
                # Terminate the process
                self.server_process.terminate()
                # Wait a bit for it to terminate
                self.server_process.wait(timeout=5)
                # Update GUI
                self.start_button.config(state=tk.NORMAL)
                self.stop_button.config(state=tk.DISABLED)
                self.label.config(text="Server stopped")
            except subprocess.TimeoutExpired:
                # If it doesn't terminate, kill it
                self.server_process.kill()
                self.server_process.wait()
                self.start_button.config(state=tk.NORMAL)
                self.stop_button.config(state=tk.DISABLED)
                self.label.config.text = "Server killed (did not respond to terminate)"
            except Exception as e:
                messagebox.showerror("Error", f"Failed to stop server: {str(e)}")
        else:
            messagebox.showinfo("Info", "Server is not running.")
    
    def on_closing(self):
        """Handle window closing event."""
        if self.server_process is not None and self.server_process.poll() is None:
            if messagebox.askokcancel("Quit", "Server is still running. Do you want to stop it and quit?"):
                self.stop_server()
                self.master.destroy()
        else:
            self.master.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = ServerControlApp(root)
    root.mainloop()