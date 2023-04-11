import React from 'react';
import ViewApprovalWizard from 'components/views/ViewApprovalWizard';
import ViewReceiver from 'components/views/ViewReceiver';
import ViewSweepTable from 'components/views/ViewSweepTable';
import ViewTokenToReceive from 'components/views/ViewTokenToReceive';
import ViewWallet from 'components/views/ViewWallet';
import {Step, SweepooorContextApp, useSweepooor} from 'contexts/useSweepooor';
import performBatchedUpdates from '@yearn-finance/web-lib/utils/performBatchedUpdates';

import type {ReactElement} from 'react';

function	Home(): ReactElement {
	const	{currentStep, set_currentStep, set_quotes, set_selected} = useSweepooor();

	return (
		<div className={'mx-auto grid w-full max-w-4xl'}>
			<div className={'mt-6 mb-10 flex flex-col justify-center md:mt-20'}>
				<h1 className={'mt-4 text-center text-3xl font-normal tracking-tight text-neutral-900 md:mt-6 md:text-4xl'}>
					{'Faster, simpler, cheaper, '}
					<b>{'Dumper'}</b>
				</h1>
				<span className={'mx-auto mt-4 w-3/4 text-center text-base leading-normal text-neutral-600 md:text-lg md:leading-8'}>
					{'Sell all your tokens in a '}
					<b>{'single transaction'}</b>
					{'. Save time, gas, and stress, with DeFi’s best token selling experience. Let’s dump.'}
				</span>
				<span className={'text-base leading-normal text-neutral-500 md:text-lg md:leading-8'}>
					{''}
				</span>
			</div>

			<ViewWallet
				onSelect={(): void => {
					set_currentStep(Step.DESTINATION);
					document?.getElementById('tokenToReceive')?.scrollIntoView({behavior: 'smooth', block: 'start'});
				}} />

			<div
				id={'tokenToReceive'}
				className={`mt-2 pt-8 transition-opacity ${[Step.SELECTOR, Step.APPROVALS, Step.RECEIVER, Step.DESTINATION].includes(currentStep) ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0'}`}>
				<ViewTokenToReceive />
			</div>

			<div
				id={'receiver'}
				className={`mt-2 pt-8 transition-opacity ${[Step.SELECTOR, Step.APPROVALS, Step.RECEIVER].includes(currentStep) ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0'}`}>
				<ViewReceiver
					onProceed={(): void => {
						performBatchedUpdates((): void => {
							set_currentStep(Step.SELECTOR);
							set_quotes({}); // Reset quotes
							set_selected([]); // Reset selected
						});
					}} />
			</div>

			<div
				id={'selector'}
				className={`mt-2 pt-8 transition-opacity ${[Step.SELECTOR, Step.APPROVALS].includes(currentStep) ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0'}`}>
				<ViewSweepTable
					onProceed={(): void => {
						set_currentStep(Step.APPROVALS);
						document?.getElementById('approvals')?.scrollIntoView({behavior: 'smooth', block: 'start'});
						document?.getElementById('TRIGGER_SWEEPOOOR')?.click();
					}} />
			</div>

			<div
				id={'approvals'}
				className={`mt-2 pt-8 transition-opacity ${[Step.APPROVALS].includes(currentStep) ? 'opacity-100' : 'pointer-events-none h-0 overflow-hidden opacity-0'}`}>
				<ViewApprovalWizard />
			</div>
		</div>
	);
}

export default function Wrapper(): ReactElement {
	return (
		<SweepooorContextApp>
			<Home />
		</SweepooorContextApp>
	);
}

