
chain_dir=~/.eris/chains/simplechain
addr=$(cat $chain_dir/addresses.csv | grep simplechain_full_000 | cut -d ',' -f 1)
echo $addr
eris pkgs do --chain simplechain --address $addr
