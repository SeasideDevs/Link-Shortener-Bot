# Copy important files over
echo "Copying important files over"
cp src/config.toml build/config.toml
# Building the actual code
echo "Compiling files"
npx tsc
# Alert that the process has finished!
echo "Done 🎉!"