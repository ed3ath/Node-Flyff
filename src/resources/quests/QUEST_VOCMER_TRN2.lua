QUEST_VOCMER_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000698',
	character = 'MaFl_Andy',
	end_character = 'MaFl_Langdrong',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCMER_TRN1',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000699',
			'IDS_PROPQUEST_INC_000700',
			'IDS_PROPQUEST_INC_000701',
			'IDS_PROPQUEST_INC_000702',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000703',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000704',
		},
		completed = {
			'IDS_PROPQUEST_INC_000705',
			'IDS_PROPQUEST_INC_000706',
			'IDS_PROPQUEST_INC_000707',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000708',
		},
	}
}
