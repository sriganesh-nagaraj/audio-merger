const ffmpeg = require('fluent-ffmpeg')
const ffmpegPath = require('ffmpeg-static')
ffmpeg.setFfmpegPath(ffmpegPath)

function mergeAudioFiles() {
  return new Promise((resolve, reject) => {
    ffmpeg()
      .input('music-1.mp3')
      .input('guided-session.mp3')
      .complexFilter([
        {
          filter: 'volume',
          options: '0.1',
          inputs: '0',
          outputs: 'quietMusic',
        },
        {
          filter: 'amix',
          options: {
            inputs: 2,
            duration: 'shortest',
          },
          inputs: ['quietMusic', '1'],
          outputs: 'mixed',
        },
        {
          filter: 'volume',
          options: '2',
          inputs: 'mixed',
        },
      ])
      .toFormat('mp3')
      .on('error', (err) => {
        console.error('An error occurred:', err)
        reject(err)
      })
      .on('end', () => {
        console.log('Audio merging completed successfully')
        resolve()
      })
      .save('merged-output.mp3')
  })
}

// Usage example:
mergeAudioFiles()
  .then(() => {
    console.log('Merge completed')
  })
  .catch((error) => {
    console.error('Merge failed:', error)
  })
