QUEST_VOCACR_TRN2 = {
	title = 'IDS_PROPQUEST_INC_000491',
	character = 'MaDa_Pyre',
	end_character = 'MaFl_Tucani',
	start_requirements = {
		min_level = 15,
		max_level = 15,
		job = { 'JOB_VAGRANT' },
		previous_quest = 'QUEST_VOCACR_TRN1',
	},
	rewards = {
		gold = 1500,
		exp = 0,
		items = {
			{ id = 'II_SYS_SYS_QUE_NTSKILL', quantity = 1, sex = 'Any' },
			{ id = 'II_SYS_BLI_BLI_DARKON', quantity = 1, sex = 'Any' },
		},
	},
	end_conditions = {
	},
	dialogs = {
		begin = {
			'IDS_PROPQUEST_INC_000492',
			'IDS_PROPQUEST_INC_000493',
			'IDS_PROPQUEST_INC_000494',
		},
		begin_yes = {
			'IDS_PROPQUEST_INC_000495',
		},
		begin_no = {
			'IDS_PROPQUEST_INC_000496',
		},
		completed = {
			'IDS_PROPQUEST_INC_000497',
			'IDS_PROPQUEST_INC_000498',
			'IDS_PROPQUEST_INC_000499',
		},
		not_finished = {
			'IDS_PROPQUEST_INC_000500',
		},
	}
}
