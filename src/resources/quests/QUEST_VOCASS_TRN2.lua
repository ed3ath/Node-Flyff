QUEST_VOCASS_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000748',
	character = 'MaFl_Maki',
	end_character = 'MaFl_Goripeg',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCASS_TRN1',
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
			'IDS_PROPQUEST_INC_000749',
			'IDS_PROPQUEST_INC_000750',
			'IDS_PROPQUEST_INC_000751',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000752',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000753',
		},
		completed = {
			'IDS_PROPQUEST_INC_000754',
			'IDS_PROPQUEST_INC_000755',
			'IDS_PROPQUEST_INC_000756',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000757',
		},
	}
}
