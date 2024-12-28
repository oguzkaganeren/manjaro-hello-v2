import { Command } from '@tauri-apps/plugin-shell';
import { invoke } from '@tauri-apps/api/core';
import commands from '../../../assets/Commands';
import commandLogger from '../../common/CommandHelper';

const fastestMirrorRunner = async () => {
  const cmd = Command.create(
    commands.fastestMirror.program,
    commands.fastestMirror.args,
    commands.fastestMirror.options,
  );
  commandLogger(cmd);
  return cmd.execute();
};

export const countryMirrorRunner = async (param:string) => {
  const arg = [...(commands.countryMirror.args as Array<string>), param];
  const cmd = Command.create(
    commands.countryMirror.program,
    arg,
    commands.countryMirror.options,
  );
  commandLogger(cmd);
  return cmd.execute();
};

export const getMirrorList = () => invoke('run_shell_command_with_result', {
  command: 'cat /etc/pacman.d/mirrorlist',
}).then((response) => {
  let responseRp = response as string;
  if (response) {
    responseRp = responseRp.replaceAll('"', '');
  }
  return responseRp;
});

export const getActiveBranch = async () => {
  const cmd = Command.create(
    commands.getActiveBranch.program,
    commands.getActiveBranch.args,
    commands.getActiveBranch.options,
  );
  commandLogger(cmd);
  return cmd.execute();
};

export const getMirrorCountry = async () => {
  const cmd = Command.create(
    commands.getMirrorCountry.program,
    commands.getMirrorCountry.args,
    commands.getMirrorCountry.options,
  );
  return cmd.execute();
};
export default fastestMirrorRunner;
